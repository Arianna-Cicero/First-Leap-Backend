import { Test, TestingModule } from '@nestjs/testing';
import { PostalCodeController } from './postal_code.controller';
import { PostalCodeService } from './postal_code.service';

describe('PostalCodeController', () => {
  let controller: PostalCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostalCodeController],
      providers: [PostalCodeService],
    }).compile();

    controller = module.get<PostalCodeController>(PostalCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
