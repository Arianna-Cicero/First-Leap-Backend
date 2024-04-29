import { Controller, Get } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly entityManager: EntityManager) {}

  @Get()
  async checkHealth(): Promise<string> {
    try {
      return await this.entityManager.query('SELECT * from postal_code');
    } catch (error) {
      console.error('Database connection error:', error);
      return 'Database connection is not healthy!';
    }
  }
}