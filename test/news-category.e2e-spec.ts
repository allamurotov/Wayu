import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
// @ts-ignore
import { createTestApp } from './utils/test-app';
// @ts-ignore
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';
import * as argon2 from 'argon2';

describe('NewsCategoryController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;
  let createdCategoryId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const password = await argon2.hash('12345');
    await dataSource.query(`
      INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role", "password")
      VALUES ('Admin User', 'admin@gmail.com', 'email', true, true, 'superAdmin', '${password}')
    `);
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  it('POST /auth/sign-in -> should respond with a jwt token and 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ login: 'admin@gmail.com', password: '12345' })
      .expect(201);

    expect(res.body.accessToken).toBeDefined();
    jwtToken = res.body.accessToken;
  });

  // CREATE Tests
  describe('Create NewsCategory', () => {
    it('POST /admin/news-categories -> should return 401 without token', async () => {
      await request(app.getHttpServer())
        .post('/admin/news-categories')
        .send({ title: 'Test Category' })
        .expect(401);
    });

    it('POST /admin/news-categories -> should return 201 with valid token and data', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/news-categories')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ title: 'Test Category' })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Category');
      createdCategoryId = res.body.id;
    });
  });

  // UPDATE Tests
  describe('Update NewsCategory', () => {
    it('PATCH /admin/news-categories/:id -> should return 401 without token', async () => {
      await request(app.getHttpServer())
        .patch(`/admin/news-categories/${createdCategoryId}`)
        .send({ title: 'Updated Category' })
        .expect(401);
    });

    it('PATCH /admin/news-categories/:id -> should return 404 with invalid ID', async () => {
      await request(app.getHttpServer())
        .patch('/admin/news-categories/99999')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ title: 'Updated Category' })
        .expect(404);
    });

    it('PATCH /admin/news-categories/:id -> should return 200 with valid token and data', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/news-categories/${createdCategoryId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({ title: 'Updated Category' })
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Updated Category');
    });
  });

  // READ Tests
  describe('Read NewsCategory', () => {
    it('GET /admin/news-categories -> should return 401 without token', async () => {
      await request(app.getHttpServer())
        .get('/admin/news-categories')
        .expect(401);
    });

    it('GET /admin/news-categories -> should return 200 with token and return categories', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/news-categories')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0].title).toEqual('Updated Category');
    });

    it('GET /admin/news-categories/:id -> should return 401 without token', async () => {
      await request(app.getHttpServer())
        .get(`/admin/news-categories/${createdCategoryId}`)
        .expect(401);
    });

    it('GET /admin/news-categories/:id -> should return 200 with token and return single category', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/news-categories/${createdCategoryId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Updated Category');
    });
  });

  // DELETE Tests
  describe('Delete NewsCategory', () => {
    it('DELETE /admin/news-categories/:id -> should return 401 without token', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/news-categories/${createdCategoryId}`)
        .expect(401);
    });

    it('DELETE /admin/news-categories/:id -> should return 404 with invalid ID', async () => {
      await request(app.getHttpServer())
        .delete('/admin/news-categories/99999')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(404);
    });

    it('DELETE /admin/news-categories/:id -> should return 200 with valid token and delete entity', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/news-categories/${createdCategoryId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      // Verify deletion
      await request(app.getHttpServer())
        .get(`/admin/news-categories/${createdCategoryId}`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(404);
    });
  });
});
