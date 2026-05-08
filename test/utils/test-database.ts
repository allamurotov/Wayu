import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

const TestDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.TEST_DB_URL,
  entities: ['./dist/src/**/*.entity.js', './src/**/*.entity.ts'],
  synchronize: true,
  dropSchema: false,
  logging: false,
};

export async function createTestDataSource(): Promise<DataSource> {
  const testDbUrl = process.env.TEST_DB_URL;
  if (!testDbUrl) {
    throw new Error('TEST_DB_URL environment variable is not set');
  }

  const dataSource = new DataSource(TestDataSourceOptions);
  try {
    await dataSource.initialize();
    console.log('Test database initialized successfully');
    return dataSource;
  } catch (error) {
    console.error('Failed to initialize test database:', error instanceof Error ? error.message : error);
    throw error;
  }
}
