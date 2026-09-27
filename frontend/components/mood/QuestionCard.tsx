import { Card, CardContent } from "@/components/ui/card";

interface QuestionCardProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  selected?: string;
}

export function QuestionCard({ question, options, onSelect, selected }: QuestionCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold">{question}</h2>
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`rounded-md border px-4 py-2 text-left transition hover:bg-accent ${
                selected === option ? "border-primary bg-accent" : "border-input"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}