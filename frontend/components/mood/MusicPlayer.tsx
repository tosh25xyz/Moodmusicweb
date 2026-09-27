"use client";

interface MusicPlayerProps {
  videoId: string | null;
}

export function MusicPlayer({ videoId }: MusicPlayerProps) {
  if (!videoId) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
      <iframe
        width="100%"
        height="80"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube music player"
        allow="autoplay; encrypted-media"
        className="rounded-md"
      />
    </div>
  );
}