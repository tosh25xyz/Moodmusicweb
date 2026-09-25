import request from 'supertest';
import app from '../app';
import { db } from '../prisma/db';

const testUser = {
  name: 'Jest Test User',
  email: `jest-${Date.now()}@example.com`,
  password: 'testpass123',
};

describe('Auth routes', () => {
  afterAll(async () => {
    await db.orm.public.User.where({ email: testUser.email }).delete();
  });

  it('should sign up a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send(testUser);
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('ok');
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.user.password).toBeUndefined();
  });

  it('should reject duplicate signup', async () => {
    const res = await request(app).post('/api/auth/signup').send(testUser);
    expect(res.status).toBe(409);
  });

  it('should reject invalid signup input', async () => {
    const res = await request(app).post('/api/auth/signup').send({ name: '', email: 'bad', password: '1' });
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('should log in with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should reject login with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
  });
});