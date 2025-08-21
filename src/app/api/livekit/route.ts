// src/app/api/livekit/route.ts

import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("--- LiveKit token endpoint hit ---");

  const room = req.nextUrl.searchParams.get('room');
  const username = req.nextUrl.searchParams.get('username');
  const mode = 'overall'; // Hardcoded as in your original code

  if (!room) {
    return NextResponse.json(
      { error: 'Missing "room" query parameter' },
      { status: 400 },
    );
  }
  if (!username) {
    return NextResponse.json(
      { error: 'Missing "username" query parameter' },
      { status: 400 },
    );
  }

  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  console.log("Reading environment variables:");
  console.log("LIVEKIT_API_KEY:", apiKey ? `SET (length: ${apiKey.length})` : "NOT SET");
  console.log("LIVEKIT_API_SECRET:", apiSecret ? `SET (length: ${apiSecret.length})` : "NOT SET");
  console.log("NEXT_PUBLIC_LIVEKIT_URL:", wsUrl ? `SET (${wsUrl})` : "NOT SET");

  if (!apiKey || !apiSecret || !wsUrl) {
    console.error("One or more environment variables are missing.");
    return NextResponse.json(
      { error: 'Server environment variables not set' },
      { status: 500 },
    );
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity: username,
      metadata: JSON.stringify({ agent_mode: mode }),
    });

    // Add video grant permissions
    at.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true, // For transcription and data publishing
    });

    const token = await at.toJwt();
    console.log(`Token generated successfully for user: ${username} with mode: ${mode} and transcription enabled.`);
    return NextResponse.json({ token });

  } catch (error) {
    console.error("Error generating LiveKit token:", (error as Error).message);
    return NextResponse.json(
      { error: `Error generating token: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}