import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('UsefulLinksController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdUsefulLinkId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin UsefulLinks CRUD', () => {
    it('POST /admin/useful-links -> should create useful link', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/useful-links')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Test Useful Link',
          link: 'https://example.com/test',
          icon: 'test-icon',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Useful Link');
      expect(res.body.link).toEqual('https://example.com/test');
      createdUsefulLinkId = res.body.id;
    });

    it('GET /admin/useful-links -> should get all useful links', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/useful-links')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/useful-links/:id -> should get one useful link', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/useful-links/${createdUsefulLinkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdUsefulLinkId);
      expect(res.body.title).toEqual('Test Useful Link');
    });

    it('PATCH /admin/useful-links/:id -> should update useful link', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/useful-links/${createdUsefulLinkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Updated Test Useful Link',
          link: 'https://example.com/updated',
          icon: 'updated-icon',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdUsefulLinkId);
      expect(res.body.title).toEqual('Updated Test Useful Link');
      expect(res.body.link).toEqual('https://example.com/updated');
    });

    it('DELETE /admin/useful-links/:id -> should delete useful link', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/useful-links/${createdUsefulLinkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public UsefulLinks GET', () => {
    let publicUsefulLinkId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/useful-links')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Public Test Useful Link',
          link: 'https://public.example.com',
          icon: 'public-icon',
        })
        .expect(201);
      publicUsefulLinkId = res.body.id;
    });

    it('GET /useful-links -> should get all useful links', async () => {
      const res = await request(app.getHttpServer())
        .get('/useful-links')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /useful-links/:id -> should get one useful link', async () => {
      const res = await request(app.getHttpServer())
        .get(`/useful-links/${publicUsefulLinkId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicUsefulLinkId);
      expect(res.body.title).toEqual('Public Test Useful Link');
    });
  });
});
