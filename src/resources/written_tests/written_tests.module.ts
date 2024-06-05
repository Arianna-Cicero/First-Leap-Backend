import { Module } from '@nestjs/common';
import { WrittenTestService } from './written_tests.service';
import { WrittenTestController } from './written_tests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WrittenTest } from './entities/written_test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WrittenTest])],
  controllers: [WrittenTestController],
  providers: [WrittenTestService],
})
export class WrittenTestsModule {}
