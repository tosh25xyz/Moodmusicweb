interface MoodMappingInput {
  mood: string;
  energy: string;
  genre: string;
  language: string;
}

export function buildSearchQuery({ mood, energy, genre, language }: MoodMappingInput): string {
  const parts: string[] = [];

  if (language) parts.push(language);
  if (genre) parts.push(genre);
  parts.push(mood);

  if (energy === 'high') parts.push('upbeat energetic');
  else if (energy === 'low') parts.push('calm relaxing');
  else if (energy === 'medium') parts.push('moderate tempo');

  parts.push('songs playlist');

  return parts.join(' ');
}