import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UtilizadorModule } from '../utilizador/utilizador.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), UtilizadorModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
