"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Song {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

interface HistoryEntry {
  id: string;
  mood: string;
  energy: string;
  genre: string;
  language: string;
  recommendedSongs: Song[];
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/api/mood/history");
        setHistory(res.data.history);
      } catch (err: any) {
        console.error("Failed to fetch history:", err);
        setError("Couldn't load your mood history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-16">
      <h1 className="text-2xl font-bold">Your Mood History</h1>

      {loading && <p className="text-muted-foreground">Loading history...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {!loading && !error && history.length === 0 && (
        <p className="text-muted-foreground">No mood history yet — go pick a mood!</p>
      )}

      <div className="flex w-full max-w-lg flex-col gap-4">
        {history.map((entry) => (
          <div key={entry.id} className="rounded-lg border p-4">
            <p className="font-semibold capitalize">{entry.mood} mood</p>
            <p className="text-sm text-muted-foreground">
              {entry.genre} • {entry.language} • {entry.energy} energy
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(entry.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-sm">
              {entry.recommendedSongs?.length || 0} songs recommended
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}