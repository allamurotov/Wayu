import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('StaticInfoController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdStaticInfoId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Static Info CRUD', () => {
    it('POST /admin/static-info -> should create static info', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/static-info')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          aboutUs: 'Test about us content',
          appStoreLink: 'https://apps.apple.com/app',
          playMarketLink: 'https://play.google.com/app',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.aboutUs).toEqual('Test about us content');
      createdStaticInfoId = res.body.id;
    });

    it('GET /admin/static-info -> should get all static info', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/static-info')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/static-info/:id -> should get one static info', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/static-info/${createdStaticInfoId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdStaticInfoId);
      expect(res.body.aboutUs).toEqual('Test about us content');
    });

    it('PATCH /admin/static-info/:id -> should update static info', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/static-info/${createdStaticInfoId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          aboutUs: 'Updated about us content',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdStaticInfoId);
      expect(res.body.aboutUs).toEqual('Updated about us content');
    });

    it('DELETE /admin/static-info/:id -> should delete static info', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/static-info/${createdStaticInfoId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Static Info GET', () => {
    let publicStaticInfoId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/static-info')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          aboutUs: 'Public about us',
        })
        .expect(201);
      publicStaticInfoId = res.body.id;
    });

    it('GET /public/static-info -> should get all static info', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/static-info')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/static-info/:id -> should get one static info', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/static-info/${publicStaticInfoId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicStaticInfoId);
      expect(res.body.aboutUs).toEqual('Public about us');
    });
  });
});
