import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface SongCardProps {
  title: string;
  artist: string;
  thumbnail: string;
  onPlay?: () => void;
}

export function SongCard({ title, artist, thumbnail, onPlay }: SongCardProps) {
  return (
    <Card className="flex items-center gap-4 p-3">
      <img src={thumbnail} alt={title} className="h-16 w-16 rounded-md object-cover" />
      <CardContent className="flex flex-1 items-center justify-between p-0">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{artist}</p>
        </div>
        <button
          onClick={onPlay}
          className="rounded-full bg-primary p-2 text-primary-foreground hover:opacity-90"
        >
          <Play size={16} />
        </button>
      </CardContent>
    </Card>
  );
}