// src/components/PushToTalkButton.tsx

"use client";

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
} from "@livekit/components-react";
import React, { useEffect, useState } from "react";
import { AudioVisualizer } from "./AudioVisualizer";

// REMOVED: AgentMode type is no longer needed here
// type AgentMode = 'overall' | 'counsellor' | 'administration';

// CHANGED: Removed the 'mode' prop
const PushToTalkControl = () => {
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
        // REMOVED: The 'mode' prop is no longer passed to the visualizer
        className={`
            w-full h-full rounded-full transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-500/50
            ${isMicrophoneEnabled ? "mic-active" : ""}
        `}
      />
    </div>
  );
};

// CHANGED: Removed the 'mode' prop from the component signature
export const PushToTalkButton = () => {
  const [token, setToken] = useState<string>("");
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

  useEffect(() => {
    const roomName = `aestr-alpha-room-${Math.floor(Math.random() * 10000)}`;
    const participantName = `user-${Math.floor(Math.random() * 1000)}`;

    (async () => {
      try {
        // CHANGED: Removed the 'mode' query parameter from the fetch request
        const resp = await fetch(
          `/api/livekit?room=${roomName}&username=${participantName}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
    // REMOVED: The 'mode' dependency from the useEffect hook
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
      {/* CHANGED: Removed the 'mode' prop from PushToTalkControl */}
      <PushToTalkControl />
    </LiveKitRoom>
  );
};