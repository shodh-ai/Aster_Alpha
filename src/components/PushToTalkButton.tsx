// src/components/PushToTalkButton.tsx

"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
} from "@livekit/components-react";
import { LocalAudioTrack } from 'livekit-client'; // Import the type
import React, { useEffect, useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";

const PushToTalkControl = () => {
  const { localParticipant } = useLocalParticipant();
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);

  useEffect(() => {
    if (localParticipant) {
      setIsMicrophoneEnabled(localParticipant.isMicrophoneEnabled);
    }
  }, [localParticipant]);

  // ***** THIS IS THE FIX *****
  // 1. Get the publications Map from the local participant.
  const audioPublications = localParticipant.audioTrackPublications;

  // 2. Get the first (and likely only) publication from the map.
  const [firstAudioPublication] = Array.from(audioPublications.values());

  // 3. Get the actual LocalAudioTrack from the publication.
  const audioTrack = firstAudioPublication?.track as LocalAudioTrack | undefined;

  const handleToggleMicrophone = () => {
    if (localParticipant) {
      const nextState = !isMicrophoneEnabled;
      localParticipant.setMicrophoneEnabled(nextState);
      setIsMicrophoneEnabled(nextState);
    }
  };

  return (
    <div className="absolute inset-0">
      <AudioVisualizer
        onClick={handleToggleMicrophone}
        isMicrophoneEnabled={isMicrophoneEnabled}
        // 4. Pass the correctly retrieved audio track to the visualizer.
        track={audioTrack}
        className={`
            w-full h-full rounded-full transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            ${isMicrophoneEnabled ? "mic-active" : ""}
        `}
      />
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
    <LiveKitRoom token={token} serverUrl={serverUrl} connect={true} audio={true}>
      <RoomAudioRenderer />
      <PushToTalkControl />
    </LiveKitRoom>
  );
};