import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('ApplicationsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdVacancyId: number;
  let createdApplicationId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
    const vacancyRes = await request(app.getHttpServer())
      .post('/admin/vacancies')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Test Vacancy',
        address: 'Tashkent',
        description: 'Test vacancy description',
        phoneNumber: '+998901234567',
        type: 'fullTime',
        salary: '3000 USD',
        isActive: true,
      })
      .expect(201);
    createdVacancyId = vacancyRes.body.id;
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Applications CRUD', () => {
    it('POST /admin/applications -> should create application', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/applications')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          fullName: 'Test Applicant',
          phoneNumber: '+998901234567',
          email: 'test@example.com',
          vacancyId: createdVacancyId,
          resume: 'Test resume content',
          status: 'pending',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.fullName).toEqual('Test Applicant');
      createdApplicationId = res.body.id;
    });

    it('GET /admin/applications -> should get all applications', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/applications')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/applications/:id -> should get one application', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/applications/${createdApplicationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdApplicationId);
      expect(res.body.fullName).toEqual('Test Applicant');
    });

    it('PATCH /admin/applications/:id -> should update application', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/applications/${createdApplicationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'accepted',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdApplicationId);
      expect(res.body.status).toEqual('accepted');
    });

    it('DELETE /admin/applications/:id -> should delete application', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/applications/${createdApplicationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Applications GET', () => {
    let publicApplicationId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/applications')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          fullName: 'Public Applicant',
          phoneNumber: '+998909876543',
          email: 'public@example.com',
          vacancyId: createdVacancyId,
          resume: 'Public resume',
          status: 'pending',
        })
        .expect(201);
      publicApplicationId = res.body.id;
    });

    it('GET /public/applications -> should get all applications', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/applications')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/applications/:id -> should get one application', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/applications/${publicApplicationId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicApplicationId);
      expect(res.body.fullName).toEqual('Public Applicant');
    });
  });
});
