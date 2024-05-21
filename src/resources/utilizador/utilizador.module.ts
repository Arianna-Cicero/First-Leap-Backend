import { Module } from '@nestjs/common';
import { UtilizadorService } from './utilizador.service';
import { UtilizadorController } from './utilizador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Utilizador])],
  controllers: [UtilizadorController],
  providers: [UtilizadorService],
})
export class UtilizadorModule {}
