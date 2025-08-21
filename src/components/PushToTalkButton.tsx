// src/components/PushToTalkButton.tsx

"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useConnectionState,
  useLocalParticipant,
  useRemoteParticipants,
  useTrackTranscription,
} from "@livekit/components-react";
import { ConnectionState, LocalAudioTrack, LocalParticipant, RemoteParticipant, TrackPublication } from 'livekit-client';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";

/**
 * A non-rendering component that processes transcriptions for a single participant
 * and notifies a parent component of any updates.
 */
const TranscriptRenderer = ({
  participant,
  onTranscription,
}: {
  participant: LocalParticipant | RemoteParticipant;
  onTranscription: (data: { text: string; final: boolean; identity: string }) => void;
}) => {
  // Correctly handle the union type by converting the Map values to an array of the base type.
  const publications = Array.from(participant.audioTrackPublications.values() as Iterable<TrackPublication>);
  const firstAudioPublication = publications[0];
  
  const trackRef = firstAudioPublication
    ? { publication: firstAudioPublication, participant, source: firstAudioPublication.source }
    : undefined;

  const { segments } = useTrackTranscription(trackRef);

  useEffect(() => {
    // Whenever segments update, construct the full sentence and report it.
    const fullText = segments.map((s) => s.text).join("");
    const isFinal = segments.length > 0 && segments[segments.length - 1].final;

    if (fullText || isFinal) { // Report even if text is empty but it's a final segment
      onTranscription({
        text: fullText,
        final: isFinal,
        identity: participant.identity,
      });
    }
  }, [segments, participant.identity, onTranscription]);

  return null;
};


const PushToTalkControl = () => {
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const connectionState = useConnectionState();
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
  
  // State to hold the current speaker's identity and their transcript
  const [activeTranscript, setActiveTranscript] = useState<{ text: string; identity: string } | null>(null);
  
  // Ref to manage the timer that clears the transcript after a pause
  const transcriptTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (localParticipant && connectionState === ConnectionState.Connected) {
      // Set initial state and enable microphone by default once connected.
      const enabled = localParticipant.isMicrophoneEnabled;
      setIsMicrophoneEnabled(enabled);
      if (!enabled) {
        localParticipant.setMicrophoneEnabled(true);
      }
    }
  }, [localParticipant, connectionState]);

  const handleToggleMicrophone = () => {
    if (localParticipant) {
      const nextState = !isMicrophoneEnabled;
      localParticipant.setMicrophoneEnabled(nextState);
      setIsMicrophoneEnabled(nextState);
    }
  };

  // This function is called by any TranscriptRenderer when there's a new update
  const handleTranscription = useCallback((data: { text: string; final: boolean; identity: string }) => {
    // Clear any pending timeout because there's new speech activity.
    if (transcriptTimer.current) {
      clearTimeout(transcriptTimer.current);
      transcriptTimer.current = null;
    }

    // If there is new text and the speaker has changed, immediately replace the old caption.
    if (data.text && activeTranscript?.identity !== data.identity) {
      setActiveTranscript({ text: data.text, identity: data.identity });
    } 
    // If it's the same speaker, just update their text.
    else if (data.text && activeTranscript?.identity === data.identity) {
      setActiveTranscript(prev => ({ ...prev!, text: data.text }));
    }
    // If the text is empty but it's a final segment, it means the speaker finished.
    // We let the timer handle the clearing.
    else if (!data.text && data.final) {
       // Do nothing, let the timer clear it.
    }
    // Any other case, we update.
    else if (data.text) {
        setActiveTranscript({ text: data.text, identity: data.identity });
    }


    // If the sentence is finished (speaker paused), set a timer to clear the caption.
    if (data.final) {
      transcriptTimer.current = setTimeout(() => {
        setActiveTranscript(null);
      }, 3000); // Clear after 3 seconds of silence.
    }
  }, [activeTranscript?.identity]);

  const allParticipants = [localParticipant, ...remoteParticipants];
  const localAudioPublications = Array.from(localParticipant.audioTrackPublications.values());
  const firstAudioPublication = localAudioPublications[0];
  const audioTrack = firstAudioPublication?.track as LocalAudioTrack | undefined;

  // Truncate text to the last N words for a clean, caption-like display.
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.trim().split(/\s+/);
    return words.slice(-wordLimit).join(" ");
  };

  return (
    <div className="absolute inset-0">
      {/* Render a listener for every participant to catch all transcripts */}
      {allParticipants.map((p) => (
        <TranscriptRenderer
          key={p.sid}
          participant={p}
          onTranscription={handleTranscription}
        />
      ))}

      <AudioVisualizer
        onClick={handleToggleMicrophone}
        isMicrophoneEnabled={isMicrophoneEnabled}
        track={audioTrack}
        className={`
            w-full h-full rounded-full transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            ${isMicrophoneEnabled ? "mic-active" : ""}
        `}
      />

      {/* Render the most recent, truncated transcript at the bottom */}
      {activeTranscript && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-none">
            <div className="bg-black/60 text-white p-3 rounded-lg text-center shadow-lg backdrop-blur-sm">
                <p>{truncateText(activeTranscript.text, 10)}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export const PushToTalkButton = () => {
  const [token, setToken] = useState<string>("");
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

  useEffect(() => {
    const roomName = `aestr-alpha-room-${Math.floor(Math.random() * 10000)}`;
    const participantName = `user-${Math.floor(Math.random() * 1000)}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${roomName}&username=${participantName}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (token === "") {
    return (
      <div className="w-full h-full flex items-center justify-center text-white/50">
        Connecting...
      </div>
    );
  }


  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      audio={false}
      options={{
        audioCaptureDefaults: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        audioOutput: {
          deviceId: 'default'
        }
      }}
    >
      <RoomAudioRenderer />
      <PushToTalkControl />
    </LiveKitRoom>
  );
};