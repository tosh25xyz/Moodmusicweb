"use client";

import { useRouter } from "next/navigation";
import { MoodCard } from "@/components/mood/MoodCard";
import { useMoodStore } from "@/store/useMoodStore";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "⚡", label: "Energetic" },
  { emoji: "😌", label: "Calm" },
  { emoji: "💔", label: "Heartbroken" },
  { emoji: "😤", label: "Angry" },
];

export default function MoodPage() {
  const { selectedMood, setMood } = useMoodStore();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-16">
      <h1 className="text-3xl font-bold">How are you feeling today?</h1>
      <div className="grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
        {moods.map((mood) => (
          <MoodCard
            key={mood.label}
            emoji={mood.emoji}
            label={mood.label}
            selected={selectedMood === mood.label}
            onClick={() => {
              setMood(mood.label);
              router.push("/questions");
            }}
          />
        ))}
      </div>
    </main>
  );
}