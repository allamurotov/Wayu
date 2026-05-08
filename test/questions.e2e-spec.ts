import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

describe('QuestionsController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdQuestionId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Questions CRUD', () => {
    it('POST /questions -> should create question', async () => {
      const res = await request(app.getHttpServer())
        .post('/questions')
        .send({
          fullName: 'Test User',
          phoneNumber: '+998901234567',
          question: 'Test question?',
          status: 'pending',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.question).toEqual('Test question?');
      createdQuestionId = res.body.id;
    });

    it('GET /questions -> should get all questions', async () => {
      const res = await request(app.getHttpServer())
        .get('/questions')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /questions/:id -> should get one question', async () => {
      const res = await request(app.getHttpServer())
        .get(`/questions/${createdQuestionId}`)
        .expect(200);

      expect(res.body.id).toEqual(createdQuestionId);
      expect(res.body.question).toEqual('Test question?');
    });

    it('PATCH /questions/:id -> should update question', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/questions/${createdQuestionId}`)
        .send({
          question: 'Updated question?',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdQuestionId);
      expect(res.body.question).toEqual('Updated question?');
    });

    it('DELETE /questions/:id -> should delete question', async () => {
      await request(app.getHttpServer())
        .delete(`/questions/${createdQuestionId}`)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/questions/${createdQuestionId}`)
        .expect(404);
    });
  });
});
