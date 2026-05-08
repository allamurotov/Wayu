import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('BooksController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdBookId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Books CRUD', () => {
    it('POST /admin/books -> should create book', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          authorId: 1,
          categoryId: 1,
          title: 'Test Book',
          image: 'test-image.jpg',
          description: 'Test Description',
          file: 'test-file.pdf',
          pages: 200,
          year: 2023,
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Book');
      expect(res.body.authorId).toEqual(1);
      expect(res.body.categoryId).toEqual(1);
      createdBookId = res.body.id;
    });

    it('GET /admin/books -> should get all books', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/books/:id -> should get one book', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/books/${createdBookId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdBookId);
      expect(res.body.title).toEqual('Test Book');
    });

    it('PATCH /admin/books/:id -> should update book', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/books/${createdBookId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Test Book',
          authorId: 2,
          categoryId: 2,
        })
        .expect(200);

      expect(res.body.id).toEqual(createdBookId);
      expect(res.body.title).toEqual('Updated Test Book');
      expect(res.body.authorId).toEqual(2);
      expect(res.body.categoryId).toEqual(2);
    });

    it('DELETE /admin/books/:id -> should delete book', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/books/${createdBookId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Books GET', () => {
    let publicBookId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/books')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          authorId: 3,
          categoryId: 3,
          title: 'Public Test Book',
          image: 'public-image.jpg',
          description: 'Public Description',
          file: 'public-file.pdf',
          pages: 300,
          year: 2024,
        })
        .expect(201);
      publicBookId = res.body.id;
    });

    it('GET /books -> should get all books', async () => {
      const res = await request(app.getHttpServer()).get('/books').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /books/:id -> should get one book', async () => {
      const res = await request(app.getHttpServer())
        .get(`/books/${publicBookId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicBookId);
      expect(res.body.title).toEqual('Public Test Book');
    });
  });
});
