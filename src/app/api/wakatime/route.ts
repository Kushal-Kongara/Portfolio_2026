import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) return NextResponse.json({ configured: false });

  try {
    const encoded = Buffer.from(apiKey).toString("base64");

    const [summaryRes, statsRes] = await Promise.all([
      fetch("https://wakatime.com/api/v1/users/current/summaries?range=last_7_days", {
        headers: { Authorization: `Basic ${encoded}` },
        next: { revalidate: 3600 },
      }),
      fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
        headers: { Authorization: `Basic ${encoded}` },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!summaryRes.ok || !statsRes.ok) return NextResponse.json({ configured: false });

    const stats = await statsRes.json();
    const data = stats.data;

    return NextResponse.json({
      configured: true,
      totalHours: Math.round((data.total_seconds ?? 0) / 3600),
      dailyAvgHours: parseFloat(((data.daily_average ?? 0) / 3600).toFixed(1)),
      topLanguage: data.languages?.[0]?.name ?? "N/A",
      topProject: data.projects?.[0]?.name ?? "N/A",
    });
  } catch {
    return NextResponse.json({ configured: false });
  }
}
