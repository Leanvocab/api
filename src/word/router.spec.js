const mongoose = require('mongoose');
import request from 'supertest';
import app from '../app';

describe('/word', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('GET /word/id', () => {
    it('correct query', async () => {
      const response = await request(app).get("/word/123456789012");
      expect(response.statusCode).toBe(200);
    });
    it('invalid id', async () => {
      const response = await request(app).get("/word/1234567890");
      expect(response.statusCode).toBe(500);
    });
  });

  describe('GET /word/all/id', () => {
    it('correct data', async () => {
      const response = await request(app)
        .get("/word/all/123")
        .expect('Content-Type', /json/)
      expect(response.statusCode).toBe(200);
    });
    it('no userId', async () => {
      const response = await request(app)
        .get("/word/all/")
        .expect('Content-Type', /json/)
      expect(response.statusCode).toBe(500);
    });
  });

  describe('POST /word', () => {
    it('correct data', async () => {
      const response = await request(app)
        .post("/word")
        .set('Accept', /application\/json/)
        .send({
          origin: 'foo',
          target: 'baz',
          userId: '1'
        })
        .expect('Content-Type', /json/);
      expect(response.statusCode).toBe(200);
      expect(response.body.origin).toBe('foo');
      expect(response.body.target).toBe('baz');
      expect(response.body.userId).toBe('1');
    });

    it('invalid data', async () => {
      const response = await request(app)
        .post("/word")
        .set('Accept', /application\/json/)
        .send({
          origin: 'foo',
          target: 'baz',
        })
        .expect('Content-Type', /json/)
      expect(response.statusCode).toBe(500);
    });
  });

  it('PUT /word/123456789012', async () => {
    const post = await request(app)
      .post("/word")
      .set('Accept', /application\/json/)
      .send({
        origin: 'foo',
        target: 'baz',
        userId: '1'
      })
    const postId = post.body._id;
    const response = await request(app)
      .put(`/word/${postId}`)
      .set('Accept', /application\/json/)
      .send({
        origin: 'abba',
        target: 'edda',
        userId: '1'
      })
    expect(response.statusCode).toBe(200);
    expect(response.body.origin).toBe('abba');
    expect(response.body.target).toBe('edda');
    expect(response.body.userId).toBe('1');
  });

  it('DELETE /word/123', async () => {
    const response = await request(app)
      .delete('/word/123456789012');
    expect(response.statusCode).toBe(200);
  });
});
