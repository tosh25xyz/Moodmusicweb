import { Router, Request } from 'express';
import { searchYouTubeSongs } from '../services/youtubeService';
import { buildSearchQuery } from '../utils/moodMapper';

const router = Router();

router.get('/', async (req: Request, res) => {
  try {
    const { mood, energy, genre, language } = req.query;

    if (!mood || !energy || !genre || !language) {
      return res.status(400).json({
        status: 'error',
        message: 'mood, energy, genre, and language query params are required',
      });
    }

    const query = buildSearchQuery({
      mood: mood as string,
      energy: energy as string,
      genre: genre as string,
      language: language as string,
    });

    const songs = await searchYouTubeSongs(query, 10);

    res.json({ status: 'ok', query, songs });
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});

export default router;