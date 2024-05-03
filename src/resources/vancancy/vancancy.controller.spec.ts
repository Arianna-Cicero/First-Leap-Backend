import { Test, TestingModule } from '@nestjs/testing';
import { VancancyController } from './vancancy.controller';

describe('VancancyController', () => {
  let controller: VancancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VancancyController],
    }).compile();

    controller = module.get<VancancyController>(VancancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
