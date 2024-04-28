import { Module } from '@nestjs/common';
import { PostalCodeService } from './postal_code.service';
import { PostalCodeController } from './postal_code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostalCode } from './entities/postal_code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostalCode])],
  controllers: [PostalCodeController],
  providers: [PostalCodeService],
})
export class PostalCodeModule {}
