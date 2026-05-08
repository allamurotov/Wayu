import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';

export async function teardownTestApp(
  app: INestApplication,
  dataSource: DataSource,
) {
  try {
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    if (app) {
      await app.close();
    }
  } catch (error) {
    // Ignore teardown errors
  }
}
