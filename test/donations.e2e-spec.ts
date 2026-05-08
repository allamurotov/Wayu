import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('DonationsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdDonationId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Donations CRUD', () => {
    it('POST /admin/donations -> should create donation', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/donations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          amount: 100.5,
          fullName: 'John Doe',
          date: new Date().toISOString(),
          paidBy: 'payme',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.amount).toEqual(100.5);
      expect(res.body.fullName).toEqual('John Doe');
      expect(res.body.paidBy).toEqual('payme');
      createdDonationId = res.body.id;
    });

    it('GET /admin/donations -> should get all donations', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/donations')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/donations/:id -> should get one donation', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/donations/${createdDonationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdDonationId);
      expect(res.body.fullName).toEqual('John Doe');
    });

    it('PATCH /admin/donations/:id -> should update donation', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/donations/${createdDonationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          fullName: 'Jane Doe',
          amount: 200.75,
        })
        .expect(200);

      expect(res.body.id).toEqual(createdDonationId);
      expect(res.body.fullName).toEqual('Jane Doe');
      expect(res.body.amount).toEqual(200.75);
    });

    it('DELETE /admin/donations/:id -> should delete donation', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/donations/${createdDonationId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Donations GET', () => {
    let publicDonationId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/donations')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          amount: 50.25,
          fullName: 'Public Test',
          date: new Date().toISOString(),
          paidBy: 'click',
        })
        .expect(201);
      publicDonationId = res.body.id;
    });

    it('GET /donations -> should get all donations', async () => {
      const res = await request(app.getHttpServer())
        .get('/donations')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /donations/:id -> should get one donation', async () => {
      const res = await request(app.getHttpServer())
        .get(`/donations/${publicDonationId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicDonationId);
      expect(res.body.fullName).toEqual('Public Test');
    });
  });
});
