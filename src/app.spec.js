import request from 'supertest';
import app from './app';

describe('app', () => {
  describe('get', () => {
    it('should return with response', async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });
});