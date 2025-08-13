// src/components/PushToTalkButton.tsx

"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
} from "@livekit/components-react";
import React, { useEffect, useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";
import { LocalParticipant } from "livekit-client";

// NEW: Define PushToTalkControl outside the main component.
// This prevents it from being redefined on every render.
const PushToTalkControl = () => {
  const { localParticipant } = useLocalParticipant();
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);

  useEffect(() => {
    if (localParticipant) {
      // Sync state with the actual participant state
      setIsMicrophoneEnabled(localParticipant.isMicrophoneEnabled);
    }
  }, [localParticipant]);

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
        track={localParticipant.audioTrack}
        className={`
            w-full h-full rounded-full transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            ${isMicrophoneEnabled ? "mic-active" : ""}
        `}
      />
    </div>
  );
};

export const PushToTalkButton = ({ mode }: { mode: string }) => {
  const [token, setToken] = useState<string>("");
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

  useEffect(() => {
    const roomName = `aestr-alpha-room-${Math.floor(Math.random() * 10000)}`;
    const participantName = `user-${Math.floor(Math.random() * 1000)}`;

    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${roomName}&username=${participantName}&mode=${mode}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [mode]);

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