import { Module } from '@nestjs/common';
import { PostalCodeService } from './postal_code.service';
import { PostalCodeController } from './postal_code.controller';

@Module({
  controllers: [PostalCodeController],
  providers: [PostalCodeService],
})
export class PostalCodeModule {}
