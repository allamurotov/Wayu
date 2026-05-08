import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('NewsCategoriesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdCategoryId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('News Categories CRUD', () => {
    it('POST /news-categories -> should create news category', async () => {
      const res = await request(app.getHttpServer())
        .post('/news-categories')
        .send({
          title: 'Test News Category',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test News Category');
      createdCategoryId = res.body.id;
    });

    it('GET /news-categories -> should get all news categories', async () => {
      const res = await request(app.getHttpServer())
        .get('/news-categories')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /news-categories/:id -> should get one news category', async () => {
      const res = await request(app.getHttpServer())
        .get(`/news-categories/${createdCategoryId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Test News Category');
    });

    it('PATCH /news-categories/:id -> should update news category', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/news-categories/${createdCategoryId}`)
        .send({
          title: 'Updated News Category',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Updated News Category');
    });

    it('DELETE /news-categories/:id -> should delete news category', async () => {
      await request(app.getHttpServer())
        .delete(`/news-categories/${createdCategoryId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/news-categories/${createdCategoryId}`)
        .expect(404);
    });
  });
});
