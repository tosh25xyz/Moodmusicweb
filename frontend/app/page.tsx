import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">🎵 MoodTunes</h1>
      <p className="max-w-md text-muted-foreground">
        Tell us how you're feeling, and we'll find the perfect songs for your mood.
      </p>
      <Link href="/mood">
        <Button size="lg">Get Started</Button>
      </Link>
    </main>
  );
}