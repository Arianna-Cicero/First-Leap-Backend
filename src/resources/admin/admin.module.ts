import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { UtilizadorModule } from '../utilizador/utilizador.module';
import { Emailverification } from '../emailverification/entities/emailverification.entity';
import { EmailverificationModule } from '../emailverification/emailverification.module';
import { EmailModule } from '@src/modules/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Emailverification]),
    forwardRef(() => EmailverificationModule),
    forwardRef(() => EmailModule),
    forwardRef(() => UtilizadorModule),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [TypeOrmModule, AdminService],
})
export class AdminModule {}
