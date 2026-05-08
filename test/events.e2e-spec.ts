import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('EventsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdCategoryId: number;
  let createdEventId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const categoryRes = await request(app.getHttpServer())
      .post('/event-categories')
      .send({ title: 'Test Event Category' })
      .expect(201);
    createdCategoryId = categoryRes.body.id;
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Events CRUD', () => {
    it('POST /admin/events -> should create event', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          categoryId: createdCategoryId,
          title: 'Test Event',
          content: 'Test Event Description',
          image: 'test-event-image.jpg',
          date: new Date().toISOString(),
          address: 'Test Location',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Event');
      expect(res.body.address).toEqual('Test Location');
      createdEventId = res.body.id;
    });

    it('GET /admin/events -> should get all events', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/events/:id -> should get one event', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/events/${createdEventId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdEventId);
      expect(res.body.title).toEqual('Test Event');
    });

    it('PATCH /admin/events/:id -> should update event', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/events/${createdEventId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Test Event',
          address: 'Updated Location',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdEventId);
      expect(res.body.title).toEqual('Updated Test Event');
      expect(res.body.address).toEqual('Updated Location');
    });

    it('DELETE /admin/events/:id -> should delete event', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/events/${createdEventId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Events GET', () => {
    let publicEventId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          categoryId: createdCategoryId,
          title: 'Public Test Event',
          content: 'Public Event Description',
          image: 'public-event-image.jpg',
          date: new Date().toISOString(),
          address: 'Public Location',
        })
        .expect(201);
      publicEventId = res.body.id;
    });

    it('GET /public/events -> should get all events', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/events')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/events/:id -> should get one event', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/events/${publicEventId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicEventId);
      expect(res.body.title).toEqual('Public Test Event');
    });
  });
});
