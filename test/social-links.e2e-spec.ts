import 'dotenv/config';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import { createTestApp } from './utils/test-app';
import { teardownTestApp } from './utils/teardown';
import { DataSource } from 'typeorm';

const adminToken = 'test-token';

describe('SocialLinksController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let createdSocialLinkId: number;

  beforeAll(async () => {
    ({ app, dataSource } = await createTestApp());
  });

  afterAll(async () => await teardownTestApp(app, dataSource));

  describe('Admin SocialLinks CRUD', () => {
    it('POST /admin/social-links -> should create social link', async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/social-links')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Facebook',
          link: 'https://facebook.com/test',
          icon: 'facebook-icon',
        })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toEqual('Facebook');
      expect(res.body.link).toEqual('https://facebook.com/test');
      createdSocialLinkId = res.body.id;
    });

    it('GET /admin/social-links -> should get all social links', async () => {
      const res = await request(app.getHttpServer())
        .get('/admin/social-links')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /admin/social-links/:id -> should get one social link', async () => {
      const res = await request(app.getHttpServer())
        .get(`/admin/social-links/${createdSocialLinkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(res.body.id).toEqual(createdSocialLinkId);
      expect(res.body.title).toEqual('Facebook');
    });

    it('PATCH /admin/social-links/:id -> should update social link', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/admin/social-links/${createdSocialLinkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Twitter',
          link: 'https://twitter.com/test',
          icon: 'twitter-icon',
        })
        .expect(200);

      expect(res.body.id).toEqual(createdSocialLinkId);
      expect(res.body.title).toEqual('Twitter');
      expect(res.body.link).toEqual('https://twitter.com/test');
    });

    it('DELETE /admin/social-links/:id -> should delete social link', async () => {
      await request(app.getHttpServer())
        .delete(`/admin/social-links/${createdSocialLinkId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('Public SocialLinks GET', () => {
    let publicSocialLinkId: number;

    beforeAll(async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/social-links')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Instagram',
          link: 'https://instagram.com/test',
          icon: 'instagram-icon',
        })
        .expect(201);
      publicSocialLinkId = res.body.id;
    });

    it('GET /social-links -> should get all social links', async () => {
      const res = await request(app.getHttpServer())
        .get('/social-links')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it('GET /social-links/:id -> should get one social link', async () => {
      const res = await request(app.getHttpServer())
        .get(`/social-links/${publicSocialLinkId}`)
        .expect(200);

      expect(res.body.id).toEqual(publicSocialLinkId);
      expect(res.body.name).toEqual('Instagram');
    });
  });
});
