import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MoodCardProps {
  emoji: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function MoodCard({ emoji, label, selected, onClick }: MoodCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition hover:scale-105 hover:shadow-md",
        selected && "border-primary ring-2 ring-primary"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center gap-2 p-6">
        <span className="text-4xl">{emoji}</span>
        <span className="font-medium">{label}</span>
      </CardContent>
    </Card>
  );
}