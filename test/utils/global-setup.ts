import 'dotenv/config';
import { DataSource } from 'typeorm';

export default async function globalSetup() {
  try {
    const defaultDbUrl = process.env.DEFAULT_DB_URL;
    const testDbName = 'Wayu_test';

    if (!defaultDbUrl) {
      console.warn('DEFAULT_DB_URL not configured, skipping database setup');
      return;
    }

    // Connect to default database to manage test database
    const defaultDb = new DataSource({
      type: 'postgres',
      url: defaultDbUrl,
    });

    await defaultDb.initialize();
    console.log('Connected to default database');

    // Drop test database if it exists
    try {
      await defaultDb.query(`DROP DATABASE IF EXISTS "${testDbName}"`);
      console.log(`Dropped test database: ${testDbName}`);
    } catch (error) {
      console.warn(`Could not drop database: ${error instanceof Error ? error.message : error}`);
    }

    // Create fresh test database
    try {
      await defaultDb.query(`CREATE DATABASE "${testDbName}"`);
      console.log(`Created test database: ${testDbName}`);
    } catch (error) {
      console.error(`Failed to create test database: ${error instanceof Error ? error.message : error}`);
    }

    await defaultDb.destroy();
    console.log('Global setup completed');
  } catch (error) {
    console.error('Global setup failed:', error instanceof Error ? error.message : error);
    // Don't throw - allow tests to run and fail if database is not available
  }
}
