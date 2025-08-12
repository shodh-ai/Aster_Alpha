"use client"; // This is a client component

import {
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant
} from "@livekit/components-react";
import React, { useEffect, useState } from "react";

export const PushToTalkButton = () => {
  const [token, setToken] = useState<string>("");
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
  
  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL!;

  // This component will be rendered once we are inside a LiveKitRoom
  const PushToTalkControl = () => {
    const { localParticipant } = useLocalParticipant();

    const handleToggleMicrophone = () => {
      if (localParticipant) {
        const nextState = !isMicrophoneEnabled;
        // The first time this is called, it will ask for mic permissions
        localParticipant.setMicrophoneEnabled(nextState);
        setIsMicrophoneEnabled(nextState);
      }
    };

    return (
      <button
        onClick={handleToggleMicrophone}
        className={`
          w-full h-full rounded-full transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-blue-500/50
          ${isMicrophoneEnabled ? "mic-active" : ""}
        `}
        aria-label={
          isMicrophoneEnabled ? "Mute microphone" : "Unmute microphone"
        }
      >
        <img className="w-full h-auto" alt="Push to Talk" src="/main.svg" />
      </button>
    );
  };

  // Fetch the token when the component mounts
  useEffect(() => {
    // For this example, we'll use a static room and username.
    // In a real app, this would be dynamic.
    const roomName = "aestr-alpha-room";
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
    return <div>Connecting to the mothership...</div>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect={true}
      // Enable audio to hear agent responses
      audio={true}
    >
      <RoomAudioRenderer />
      <PushToTalkControl />
    </LiveKitRoom>
  );
};