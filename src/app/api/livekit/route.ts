// src/app/api/livekit/route.ts
import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Log that the function has been hit
  console.log("--- LiveKit token endpoint hit ---");

  const room = req.nextUrl.searchParams.get('room');
  const username = req.nextUrl.searchParams.get('username');

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

  // === START OF DEBUGGING BLOCK ===
  // Let's print the values the server is actually seeing.
  console.log("Reading environment variables:");
  console.log("LIVEKIT_API_KEY:", apiKey ? `SET (length: ${apiKey.length})` : "NOT SET");
  console.log("LIVEKIT_API_SECRET:", apiSecret ? `SET (length: ${apiSecret.length})` : "NOT SET");
  console.log("NEXT_PUBLIC_LIVEKIT_URL:", wsUrl ? `SET (${wsUrl})` : "NOT SET");
  // === END OF DEBUGGING BLOCK ===


  if (!apiKey || !apiSecret || !wsUrl) {
    console.error("One or more environment variables are missing.");
    return NextResponse.json(
      { error: 'Server environment variables not set' },
      { status: 500 },
    );
  }

  try {
    const at = new AccessToken(apiKey, apiSecret, { identity: username });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

    const token = await at.toJwt();
    console.log("Token generated successfully for user:", username);
    return NextResponse.json({ token });

  } catch (error) {
    // This will catch errors if the API keys are present but malformed/invalid
    console.error("Error generating LiveKit token:", (error as Error).message);
    return NextResponse.json(
      { error: `Error generating token: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}