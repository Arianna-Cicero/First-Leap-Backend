import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly connection: Connection) {}

  async testConnection(): Promise<string> {
    try {
      const result = await this.connection.query('SELECT 1');
      return 'Database connection test successful!';
    } catch (error) {
      return `Database connection test failed: ${error.message}`;
    }
  }
}
