import { Router, Response } from 'express';
import { db } from '../prisma/db';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { moodHistorySchema } from '../validators/moodHistory.validator';
const router = Router();



router.post('/history', authMiddleware,validate(moodHistorySchema), async (req: AuthRequest, res) => {
  try {
    const { mood, energy, genre, language, recommendedSongs } = req.body;

    

    const entry = await db.orm.public.MoodHistory.create({
      userId: req.userId as string,
      mood,
      energy,
      genre,
      language,
      recommendedSongs,
    });

    res.status(201).json({ status: 'ok', entry });
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});

router.get('/history', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const history = await db.orm.public.MoodHistory.where({ userId: req.userId as string }).all();
    res.json({ status: 'ok', history });
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});

export default router;