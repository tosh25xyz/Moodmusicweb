"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/mood/QuestionCard";
import { useMoodStore } from "@/store/useMoodStore";

const questions = [
  {
    question: "What language do you want your songs in?",
    options: ["English", "Bangla", "Hindi", "Any"],
  },
  {
    question: "What's your energy level right now?",
    options: ["Low", "Medium", "High"],
  },
  {
    question: "Pick a genre",
    options: ["Pop", "Lo-fi", "Rock", "Classical", "Any"],
  },
];

export default function QuestionsPage() {
  const [step, setStep] = useState(0);
  const { answers, addAnswer } = useMoodStore();
  const router = useRouter();

  const handleSelect = (option: string) => {
    addAnswer(option);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      router.push("/playlist");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <p className="text-sm text-muted-foreground">
        Question {step + 1} of {questions.length}
      </p>
      <QuestionCard
        question={questions[step].question}
        options={questions[step].options}
        onSelect={handleSelect}
        selected={answers[step]}
      />
    </main>
  );
}