import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('BranchesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdBranchId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Branches CRUD', () => {
    it('POST /branches -> should create branch', async () => {
      const res = await request(app.getHttpServer())
        .post('/branches')
        .send({
          title: 'Test Branch',
          address: 'Test Address',
          phoneNumber: '+998901234567',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Test Branch');
      createdBranchId = res.body.id;
    });

    it('GET /branches -> should get all branches', async () => {
      const res = await request(app.getHttpServer())
        .get('/branches')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /branches/:id -> should get one branch', async () => {
      const res = await request(app.getHttpServer())
        .get(`/branches/${createdBranchId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdBranchId);
      expect(res.body.title).toEqual('Test Branch');
    });

    it('PATCH /branches/:id -> should update branch', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/branches/${createdBranchId}`)
        .send({
          title: 'Updated Branch',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdBranchId);
      expect(res.body.title).toEqual('Updated Branch');
    });

    it('DELETE /branches/:id -> should delete branch', async () => {
      await request(app.getHttpServer())
        .delete(`/branches/${createdBranchId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/branches/${createdBranchId}`)
        .expect(404);
    });
  });
});
