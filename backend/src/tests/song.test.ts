import request from 'supertest';
import app from '../app';

describe('Songs route', () => {
  it('should return songs for valid mood params', async () => {
    const res = await request(app).get('/api/songs').query({
      mood: 'happy',
      energy: 'high',
      genre: 'pop',
      language: 'english',
    });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.songs)).toBe(true);
    expect(res.body.songs.length).toBeGreaterThan(0);
  }, 15000); // longer timeout since this hits the real YouTube API

  it('should reject missing query params', async () => {
    const res = await request(app).get('/api/songs').query({ mood: 'happy' });
    expect(res.status).toBe(400);
  });
});