import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('BookCategoriesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdCategoryId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Book Categories CRUD', () => {
    it('POST /book-categories -> should create book category', async () => {
      const res = await request(app.getHttpServer())
        .post('/book-categories')
        .send({
          title: 'Test Category',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Category');
      createdCategoryId = res.body.id;
    });

    it('GET /book-categories -> should get all book categories', async () => {
      const res = await request(app.getHttpServer())
        .get('/book-categories')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /book-categories/:id -> should get one book category', async () => {
      const res = await request(app.getHttpServer())
        .get(`/book-categories/${createdCategoryId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Test Category');
    });

    it('PATCH /book-categories/:id -> should update book category', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/book-categories/${createdCategoryId}`)
        .send({
          title: 'Updated Category',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Updated Category');
    });

    it('DELETE /book-categories/:id -> should delete book category', async () => {
      await request(app.getHttpServer())
        .delete(`/book-categories/${createdCategoryId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/book-categories/${createdCategoryId}`)
        .expect(404);
    });
  });
});
