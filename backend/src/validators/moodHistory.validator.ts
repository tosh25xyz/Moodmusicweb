import { z } from 'zod';

export const moodHistorySchema = z.object({
  mood: z.string().min(1),
  energy: z.enum(['low', 'medium', 'high']),
  genre: z.string().min(1),
  language: z.string().min(1),
  recommendedSongs: z.array(z.string()).min(1, 'At least one song is required'),
});