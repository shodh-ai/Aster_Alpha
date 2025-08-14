// src/components/PushToTalkButton.tsx

"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
} from "@livekit/components-react";
import React, { useEffect, useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";

// NEW: Define the type for the mode for better type safety
type AgentMode = 'overall' | 'counsellor' | 'administration';

// UPDATED: PushToTalkControl now accepts the 'mode' prop
const PushToTalkControl = ({ mode }: { mode: AgentMode }) => {
  const { localParticipant } = useLocalParticipant();
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);

  useEffect(() => {
    if (localParticipant) {
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
        // NEW: Pass the mode down to the visualizer
        mode={mode}
        className={`
            w-full h-full rounded-full transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            ${isMicrophoneEnabled ? "mic-active" : ""}
        `}
      />
    </div>
  );
};

// UPDATED: Ensure the mode prop type matches our defined type
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
      {/* UPDATED: Pass the mode to PushToTalkControl */}
      <PushToTalkControl mode={mode as AgentMode} />
    </LiveKitRoom>
  );
};