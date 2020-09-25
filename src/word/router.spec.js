import request from 'supertest';
import app from '../app';

describe('/word', () => {
  it('GET /word/id', async () => {
    const response = await request(app).get("/word/123");
    expect(response.statusCode).toBe(200);
  });

  it('GET /word/all/id', async () => {
    const response = await request(app).get("/word/all/123");
    expect(response.statusCode).toBe(200);
  });

  it('POST /word', async () => {
    const response = await request(app).post("/word");
    expect(response.statusCode).toBe(200);
  });

  it('PUT /word/123', async () => {
    const response = await request(app).put("/word/123");
    expect(response.statusCode).toBe(200);
  });
});