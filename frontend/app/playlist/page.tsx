"use client";

import { useEffect, useState } from "react";
import { SongCard } from "@/components/mood/SongCard";
import { MusicPlayer } from "@/components/mood/MusicPlayer";
import { useMoodStore } from "@/store/useMoodStore";
import { api } from "@/lib/api";

interface Song {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

export default function PlaylistPage() {
  const { selectedMood, answers } = useMoodStore();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const [language, energy, genre] = answers;
        const res = await api.get("/api/songs", {
          params: {
            mood: selectedMood?.toLowerCase(),
            language: language?.toLowerCase() || "any",
            energy: energy?.toLowerCase() || "medium",
            genre: genre?.toLowerCase() || "any",
          },
        });
        setSongs(res.data.songs);

        await api.post("/api/mood/history", {
          mood: selectedMood?.toLowerCase(),
          energy: energy?.toLowerCase() || "medium",
          genre: genre?.toLowerCase() || "any",
          language: language?.toLowerCase() || "any",
          recommendedSongs: res.data.songs.map((s: Song) => s.videoId),
        });
      } catch (err: any) {
        console.error("Failed to fetch songs:", err);
        setError("Couldn't load songs. Try again.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedMood) fetchSongs();
  }, [selectedMood, answers]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-16 pb-32">
      <h1 className="text-2xl font-bold">
        Songs for your {selectedMood?.toLowerCase() || ""} mood
      </h1>

      {loading && <p className="text-muted-foreground">Loading songs...</p>}
      {error && <p className="text-destructive">{error}</p>}

      <div className="flex w-full max-w-lg flex-col gap-3">
        {songs.map((song) => (
          <SongCard
            key={song.videoId}
            title={song.title}
            artist={song.channelTitle}
            thumbnail={song.thumbnail}
            onPlay={() => setNowPlaying(song.videoId)}
          />
        ))}
      </div>

      <MusicPlayer videoId={nowPlaying} />
    </main>
  );
}