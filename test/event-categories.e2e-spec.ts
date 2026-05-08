import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('EventCategoriesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdCategoryId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Event Categories CRUD', () => {
    it('POST /event-categories -> should create event category', async () => {
      const res = await request(app.getHttpServer())
        .post('/event-categories')
        .send({
          title: 'Test Event Category',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Event Category');
      createdCategoryId = res.body.id;
    });

    it('GET /event-categories -> should get all event categories', async () => {
      const res = await request(app.getHttpServer())
        .get('/event-categories')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /event-categories/:id -> should get one event category', async () => {
      const res = await request(app.getHttpServer())
        .get(`/event-categories/${createdCategoryId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Test Event Category');
    });

    it('PATCH /event-categories/:id -> should update event category', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/event-categories/${createdCategoryId}`)
        .send({
          title: 'Updated Event Category',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdCategoryId);
      expect(res.body.title).toEqual('Updated Event Category');
    });

    it('DELETE /event-categories/:id -> should delete event category', async () => {
      await request(app.getHttpServer())
        .delete(`/event-categories/${createdCategoryId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/event-categories/${createdCategoryId}`)
        .expect(404);
    });
  });
});
