import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('LanguagesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdLanguageId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Languages CRUD', () => {
    it('POST /languages -> should create language', async () => {
      const res = await request(app.getHttpServer())
        .post('/languages')
        .send({
          title: 'Test Language',
          code: 'TL',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Language');
      createdLanguageId = res.body.id;
    });

    it('GET /languages -> should get all languages', async () => {
      const res = await request(app.getHttpServer())
        .get('/languages')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /languages/:id -> should get one language', async () => {
      const res = await request(app.getHttpServer())
        .get(`/languages/${createdLanguageId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdLanguageId);
      expect(res.body.title).toEqual('Test Language');
    });

    it('PATCH /languages/:id -> should update language', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/languages/${createdLanguageId}`)
        .send({
          title: 'Updated Language',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdLanguageId);
      expect(res.body.title).toEqual('Updated Language');
    });

    it('DELETE /languages/:id -> should delete language', async () => {
      await request(app.getHttpServer())
        .delete(`/languages/${createdLanguageId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/languages/${createdLanguageId}`)
        .expect(404);
    });
  });
});
