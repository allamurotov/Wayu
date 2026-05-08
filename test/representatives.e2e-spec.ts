import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('RepresentativesController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdRepId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Representatives CRUD', () => {
    it('POST /representatives -> should create representative', async () => {
      const res = await request(app.getHttpServer())
        .post('/representatives')
        .send({
          fullName: 'Test Representative',
          image: 'test-image.jpg',
          email: 'test@example.com',
          phoneNumber: '+998901234567',
          resume: 'Test resume',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.fullName).toEqual('Test Representative');
      createdRepId = res.body.id;
    });

    it('GET /representatives -> should get all representatives', async () => {
      const res = await request(app.getHttpServer())
        .get('/representatives')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /representatives/:id -> should get one representative', async () => {
      const res = await request(app.getHttpServer())
        .get(`/representatives/${createdRepId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdRepId);
      expect(res.body.fullName).toEqual('Test Representative');
    });

    it('PATCH /representatives/:id -> should update representative', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/representatives/${createdRepId}`)
        .send({
          fullName: 'Updated Representative',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdRepId);
      expect(res.body.fullName).toEqual('Updated Representative');
    });

    it('DELETE /representatives/:id -> should delete representative', async () => {
      await request(app.getHttpServer())
        .delete(`/representatives/${createdRepId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/representatives/${createdRepId}`)
        .expect(404);
    });
  });
});
