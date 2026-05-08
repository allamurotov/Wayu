import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('TagsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdTagId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Tags CRUD', () => {
    it('POST /admin/tags -> should create tag', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/tags')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Tag',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Tag');
      createdTagId = res.body.id;
    });

    it('GET /admin/tags -> should get all tags', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/tags')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/tags/:id -> should get one tag', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/tags/${createdTagId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdTagId);
      expect(res.body.title).toEqual('Test Tag');
    });

    it('PATCH /admin/tags/:id -> should update tag', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/tags/${createdTagId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Test Tag',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdTagId);
      expect(res.body.title).toEqual('Updated Test Tag');
    });

    it('DELETE /admin/tags/:id -> should delete tag', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/tags/${createdTagId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Tags GET', () => {
    let publicTagId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/tags')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Public Test Tag',
        })
        .expect(201);
      publicTagId = res.body.id;
    });

    it('GET /public/tags -> should get all tags', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/tags')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/tags -> should get all tags', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/tags')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/tags/:id -> should get one tag', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/tags/${publicTagId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicTagId);
      expect(res.body.title).toEqual('Public Test Tag');
    });
  });
});
