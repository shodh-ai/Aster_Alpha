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
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const publications = Array.from(participant.audioTrackPublications.values() as Iterable<TrackPublication>);
  const firstAudioPublication = publications[0];

  const trackRef = firstAudioPublication
    ? { publication: firstAudioPublication, participant, source: firstAudioPublication.source }
    : undefined;

  const { segments } = useTrackTranscription(trackRef);

  // ====================================================================
  // START OF THE FIX: Logic to ensure transcripts are fresh
  // ====================================================================
  useEffect(() => {
    if (segments.length === 0) {
      return;
    }

    // Find the index of the last segment that was marked as 'final'.
    // We search backwards from the second-to-last segment because the very last one
    // might not be final yet.
    let lastFinalIndex = -1;
    for (let i = segments.length - 2; i >= 0; i--) {
      if (segments[i].final) {
        lastFinalIndex = i;
        break;
      }
    }

    // The current utterance is everything *after* the last final segment.
    // This makes every new sentence feel "fresh".
    const currentUtteranceSegments = segments.slice(lastFinalIndex + 1);
    const text = currentUtteranceSegments.map((s) => s.text).join("");

    // The utterance is considered final only if the very last segment is final.
    const lastSegment = segments[segments.length - 1];
    const isFinal = lastSegment.final;

    // We send an update if there's text to show OR if the utterance is final.
    // Sending a final, empty text is important to trigger the clear timer in the parent component.
    if (text || isFinal) {
      onTranscription({
        text,
        final: isFinal,
        identity: participant.identity,
      });
    }
  }, [segments, participant.identity, onTranscription]);
  // ====================================================================
  // END OF THE FIX
  // ====================================================================

  return null;
};


const PushToTalkControl = () => {
  const { localParticipant } = useLocalParticipant();
  const remoteParticipants = useRemoteParticipants();
  const connectionState = useConnectionState();
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);

  const [activeTranscript, setActiveTranscript] = useState<{ text: string; identity: string } | null>(null);
  const transcriptTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (localParticipant && connectionState === ConnectionState.Connected) {
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

  const handleTranscription = useCallback((data: { text: string; final: boolean; identity: string }) => {
    if (transcriptTimer.current) {
      clearTimeout(transcriptTimer.current);
      transcriptTimer.current = null;
    }

    // Since the text is now fresh, we can just set it directly.
    if (data.text) {
      setActiveTranscript({ text: data.text, identity: data.identity });
    }

    // If the sentence is finished (speaker paused), set a timer to clear the caption.
    if (data.final) {
      transcriptTimer.current = setTimeout(() => {
        setActiveTranscript(null);
      }, 3000); // Clear after 3 seconds of inactivity.
    }
  }, []); // Empty dependency array is correct here.

  const allParticipants = [localParticipant, ...remoteParticipants];

  const audioTrack = useMemo(() => {
    const localAudioPublications = Array.from(localParticipant.audioTrackPublications.values());
    const firstAudioPublication = localAudioPublications[0];
    return firstAudioPublication?.track as LocalAudioTrack | undefined;
  }, [localParticipant.audioTrackPublications]);

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.trim().split(/\s+/);
    return words.slice(-wordLimit).join(" ");
  };

  return (
    <div className="absolute inset-0">
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