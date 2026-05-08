import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('ExpensesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdExpenseId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin Expenses CRUD', () => {
    it('POST /admin/expenses -> should create expense', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/expenses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          amount: 500.0,
          date: new Date().toISOString(),
          title: 'Office Rent',
          description: 'Monthly office rent payment',
          transactionId: 'TX123456789',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.amount).toEqual(500.0);
      expect(res.body.title).toEqual('Office Rent');
      expect(res.body.transactionId).toEqual('TX123456789');
      createdExpenseId = res.body.id;
    });

    it('GET /admin/expenses -> should get all expenses', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/expenses')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/expenses/:id -> should get one expense', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/expenses/${createdExpenseId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdExpenseId);
      expect(res.body.title).toEqual('Office Rent');
    });

    it('PATCH /admin/expenses/:id -> should update expense', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/expenses/${createdExpenseId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Office Rent Updated',
          amount: 550.0,
          description: 'Updated monthly office rent',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdExpenseId);
      expect(res.body.title).toEqual('Office Rent Updated');
      expect(res.body.amount).toEqual(550.0);
    });

    it('DELETE /admin/expenses/:id -> should delete expense', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/expenses/${createdExpenseId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public Expenses GET', () => {
    let publicExpenseId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/expenses')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          amount: 100.25,
          date: new Date().toISOString(),
          title: 'Public Test Expense',
          transactionId: 'TX987654321',
        })
        .expect(201);
      publicExpenseId = res.body.id;
    });

    it('GET /expenses -> should get all expenses', async () => {
      const res = await request(app.getHttpServer())
        .get('/expenses')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /expenses/:id -> should get one expense', async () => {
      const res = await request(app.getHttpServer())
        .get(`/expenses/${publicExpenseId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicExpenseId);
      expect(res.body.title).toEqual('Public Test Expense');
    });
  });
});
