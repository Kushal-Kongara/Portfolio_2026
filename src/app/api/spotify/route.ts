import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({ configured: false });
  }

  try {
    const accessToken = await getAccessToken();

    const nowRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" }
    );

    if (nowRes.status === 204 || nowRes.status > 400) {
      // Not playing — get last played
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" }
      );
      const recent = await recentRes.json();
      const track = recent.items?.[0]?.track;
      if (!track) return NextResponse.json({ configured: true, isPlaying: false });
      return NextResponse.json({
        configured: true,
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(", "),
        albumArt: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      });
    }

    const data = await nowRes.json();

    // If currently-playing returned 200 but no item, fall back to recently-played
    if (!data.item) {
      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" }
      );
      const recent = await recentRes.json();
      const track = recent.items?.[0]?.track;
      if (!track) return NextResponse.json({ configured: true, isPlaying: false });
      return NextResponse.json({
        configured: true,
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(", "),
        albumArt: track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      });
    }

    return NextResponse.json({
      configured: true,
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists?.map((a: any) => a.name).join(", "),
      albumArt: data.item.album?.images?.[0]?.url,
      songUrl: data.item.external_urls?.spotify,
    });
  } catch {
    return NextResponse.json({ configured: true, isPlaying: false });
  }
}
