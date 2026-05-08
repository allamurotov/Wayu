import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('VacanciesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdVacancyId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Vacancies CRUD', () => {
    it('POST /admin/vacancies -> should create vacancy', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/vacancies')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Senior Developer',
          address: 'Tashkent, Uzbekistan',
          description: 'Looking for senior developer',
          phoneNumber: '+998901234567',
          type: 'fullTime',
          salary: '5000 USD',
          isActive: true,
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Senior Developer');
      createdVacancyId = res.body.id;
    });

    it('GET /admin/vacancies -> should get all vacancies', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/vacancies')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/vacancies/:id -> should get one vacancy', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/vacancies/${createdVacancyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdVacancyId);
      expect(res.body.title).toEqual('Senior Developer');
    });

    it('PATCH /admin/vacancies/:id -> should update vacancy', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/vacancies/${createdVacancyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Lead Developer',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdVacancyId);
      expect(res.body.title).toEqual('Lead Developer');
    });

    it('DELETE /admin/vacancies/:id -> should delete vacancy', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/vacancies/${createdVacancyId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Vacancies GET', () => {
    let publicVacancyId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/vacancies')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Junior Developer',
          address: 'Tashkent, Uzbekistan',
          description: 'Looking for junior developer',
          phoneNumber: '+998909876543',
          type: 'fullTime',
          salary: '2000 USD',
          isActive: true,
        })
        .expect(201);
      publicVacancyId = res.body.id;
    });

    it('GET /public/vacancies -> should get all vacancies', async () => {
      const res = await request(app.getHttpServer())
        .get('/public/vacancies')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /public/vacancies/:id -> should get one vacancy', async () => {
      const res = await request(app.getHttpServer())
        .get(`/public/vacancies/${publicVacancyId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicVacancyId);
      expect(res.body.title).toEqual('Junior Developer');
    });
  });
});
