import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('InstagramPostsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdPostId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Instagram Posts CRUD', () => {
    it('POST /instagram-posts -> should create instagram post', async () => {
      const res = await request(app.getHttpServer())
        .post('/instagram-posts')
        .send({
          image: 'https://example.com/image.jpg',
          link: 'https://instagram.com/test',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.image).toEqual('https://example.com/image.jpg');
      createdPostId = res.body.id;
    });

    it('GET /instagram-posts -> should get all instagram posts', async () => {
      const res = await request(app.getHttpServer())
        .get('/instagram-posts')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /instagram-posts/:id -> should get one instagram post', async () => {
      const res = await request(app.getHttpServer())
        .get(`/instagram-posts/${createdPostId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdPostId);
      expect(res.body.image).toEqual('https://example.com/image.jpg');
    });

    it('PATCH /instagram-posts/:id -> should update instagram post', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/instagram-posts/${createdPostId}`)
        .send({
          link: 'https://instagram.com/updated',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdPostId);
      expect(res.body.link).toEqual('https://instagram.com/updated');
    });

    it('DELETE /instagram-posts/:id -> should delete instagram post', async () => {
      await request(app.getHttpServer())
        .delete(`/instagram-posts/${createdPostId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/instagram-posts/${createdPostId}`)
        .expect(404);
    });
  });
});
