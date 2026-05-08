import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('FaqsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdFaqId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Faqs CRUD', () => {
    it('POST /admin/faqs -> should create faq', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/faqs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          question: 'Test Question',
          answer: 'Test Answer',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.question).toEqual('Test Question');
      expect(res.body.answer).toEqual('Test Answer');
      createdFaqId = res.body.id;
    });

    it('GET /admin/faqs -> should get all faqs', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/faqs')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/faqs/:id -> should get one faq', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/faqs/${createdFaqId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdFaqId);
      expect(res.body.question).toEqual('Test Question');
    });

    it('PATCH /admin/faqs/:id -> should update faq', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/faqs/${createdFaqId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          question: 'Updated Test Question',
          answer: 'Updated Test Answer',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdFaqId);
      expect(res.body.question).toEqual('Updated Test Question');
      expect(res.body.answer).toEqual('Updated Test Answer');
    });

    it('DELETE /admin/faqs/:id -> should delete faq', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/faqs/${createdFaqId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Faqs GET', () => {
    let publicFaqId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/faqs')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          question: 'Public Test Question',
          answer: 'Public Test Answer',
        })
        .expect(201);
      publicFaqId = res.body.id;
    });

    it('GET /faqs -> should get all faqs', async () => {
      const res = await request(app.getHttpServer()).get('/faqs').expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /faqs/:id -> should get one faq', async () => {
      const res = await request(app.getHttpServer())
        .get(`/faqs/${publicFaqId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicFaqId);
      expect(res.body.question).toEqual('Public Test Question');
    });
  });
});
