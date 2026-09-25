import express from 'express';
import cors from 'cors';
import { db } from './prisma/db';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import { authMiddleware, AuthRequest } from './middleware/authMiddleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import songsRoutes from './routes/songs.routes';
import moodHistoryRoutes from './routes/moodHistory.routes';
import { errorHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiter';






const app = express();

app.use(helmet());
app.use(generalLimiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use('/api/mood', moodHistoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/songs', songsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/test-db', async (req, res) => {
  try {
    const users = await db.orm.public.User.all();
    res.json({ status: 'ok', users });
  } catch (err) {
    res.status(500).json({ status: 'error', message: (err as Error).message });
  }
});


app.get('/api/me', authMiddleware, async (req: AuthRequest, res) => {
  res.json({ status: 'ok', userId: req.userId });
});
app.use(errorHandler);

export default app;