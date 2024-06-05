import { Test, TestingModule } from '@nestjs/testing';
import { WrittenTestsController } from './written_tests.controller';
import { WrittenTestsService } from './written_tests.service';

describe('WrittenTestsController', () => {
  let controller: WrittenTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WrittenTestsController],
      providers: [WrittenTestsService],
    }).compile();

    controller = module.get<WrittenTestsController>(WrittenTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
