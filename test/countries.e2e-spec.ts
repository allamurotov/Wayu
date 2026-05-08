import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('CountriesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdCountryId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Countries CRUD', () => {
    it('POST /admin/countries -> should create country', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Country',
          flag: 'test-flag-url',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Country');
      expect(res.body.flag).toEqual('test-flag-url');
      createdCountryId = res.body.id;
    });

    it('GET /admin/countries -> should get all countries', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/countries/:id -> should get one country', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/countries/${createdCountryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdCountryId);
      expect(res.body.title).toEqual('Test Country');
    });

    it('PATCH /admin/countries/:id -> should update country', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/countries/${createdCountryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Test Country',
          flag: 'updated-flag-url',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdCountryId);
      expect(res.body.title).toEqual('Updated Test Country');
      expect(res.body.flag).toEqual('updated-flag-url');
    });

    it('DELETE /admin/countries/:id -> should delete country', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/countries/${createdCountryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Countries GET', () => {
    let publicCountryId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Public Test Country',
          flag: 'public-flag-url',
        })
        .expect(201);
      publicCountryId = res.body.id;
    });

    it('GET /countries -> should get all countries', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/countries')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /countries/:id -> should get one country', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/countries/${publicCountryId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicCountryId);
      expect(res.body.title).toEqual('Public Test Country');
    });
  });
});
