import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('AuthorsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdAuthorId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Authors CRUD', () => {
    it('POST /authors -> should create author', async () => {
      const res = await request(app.getHttpServer())
        .post('/authors')
        .send({
          fullName: 'Test Author',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.fullName).toEqual('Test Author');
      createdAuthorId = res.body.id;
    });

    it('GET /authors -> should get all authors', async () => {
      const res = await request(app.getHttpServer())
        .get('/authors')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /authors/:id -> should get one author', async () => {
      const res = await request(app.getHttpServer())
        .get(`/authors/${createdAuthorId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdAuthorId);
      expect(res.body.fullName).toEqual('Test Author');
    });

    it('PATCH /authors/:id -> should update author', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/authors/${createdAuthorId}`)
        .send({
          fullName: 'Updated Author',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdAuthorId);
      expect(res.body.fullName).toEqual('Updated Author');
    });

    it('DELETE /authors/:id -> should delete author', async () => {
      await request(app.getHttpServer())
        .delete(`/authors/${createdAuthorId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/authors/${createdAuthorId}`)
        .expect(404);
    });
  });
});
