import { Test, TestingModule } from '@nestjs/testing';
import { EmailverificationController } from './emailverification.controller';
import { EmailverificationService } from './emailverification.service';

describe('EmailverificationController', () => {
  let controller: EmailverificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailverificationController],
      providers: [EmailverificationService],
    }).compile();

    controller = module.get<EmailverificationController>(EmailverificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
