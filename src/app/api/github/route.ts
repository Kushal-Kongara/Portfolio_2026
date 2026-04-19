import { NextResponse } from "next/server";

interface GitHubPushEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: { message: string }[] };
  created_at: string;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/Kushal-Kongara/events/public?per_page=50",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "portfolio-site",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return NextResponse.json({ events: [] });

    const data = await res.json();

    const events = (data as GitHubPushEvent[])
      .filter((e) => e.type === "PushEvent")
      .slice(0, 5)
      .map((e) => ({
        repo: e.repo.name.replace("Kushal-Kongara/", ""),
        message: e.payload.commits?.[0]?.message?.split("\n")[0] || "committed changes",
        date: e.created_at,
      }));

    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}
