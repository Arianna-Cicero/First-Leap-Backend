import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly connection: Connection) {}

  async testConnection(): Promise<string> {
    try {
      // Execute a simple query to test the connection
      const result = await this.connection.query('SELECT 1');

      // If the query was successful, return a success message
      return 'Database connection test successful!';
    } catch (error) {
      // If an error occurs, return an error message
      return `Database connection test failed: ${error.message}`;
    }
  }
}
