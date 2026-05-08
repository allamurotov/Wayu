import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('NewsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdCategoryId: number;
  let createdNewsId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const categoryRes = await request(app.getHttpServer())
      .post('/news-categories')
      .send({ title: 'Test News Category' })
      .expect(201);
    createdCategoryId = categoryRes.body.id;
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin News CRUD', () => {
    it('POST /admin/news -> should create news', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          categoryId: createdCategoryId,
          title: 'Test News',
          image: 'https://example.com/image.jpg',
          content: 'Test news content',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test News');
      createdNewsId = res.body.id;
    });

    it('GET /admin/news -> should get all news', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/news')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/news/:id -> should get one news', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/news/${createdNewsId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdNewsId);
      expect(res.body.title).toEqual('Test News');
    });

    it('PATCH /admin/news/:id -> should update news', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/news/${createdNewsId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated News',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdNewsId);
      expect(res.body.title).toEqual('Updated News');
    });

    it('DELETE /admin/news/:id -> should delete news', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/news/${createdNewsId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public News GET', () => {
    let publicNewsId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          categoryId: createdCategoryId,
          title: 'Public News',
          image: 'https://example.com/image2.jpg',
          content: 'Public news content',
        })
        .expect(201);
      publicNewsId = res.body.id;
    });

    it('GET /public/news -> should get all news', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/news')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/news/:id -> should get one news', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/news/${publicNewsId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicNewsId);
      expect(res.body.title).toEqual('Public News');
    });
  });
});
