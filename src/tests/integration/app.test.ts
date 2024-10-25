import app from 'src/app';
import request from 'supertest';
import { Server } from 'http';

let server: Server;

beforeAll(() => {
  server = app.listen();
});

afterAll(async () => {
  await server.close();
});

describe('GET /', () => {
  it('should return a health check message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Server is healthy and running');
  });
});
