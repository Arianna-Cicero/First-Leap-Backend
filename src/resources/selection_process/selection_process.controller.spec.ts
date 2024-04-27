import { Test, TestingModule } from '@nestjs/testing';
import { SelectionProcessController } from './selection_process.controller';

describe('SelectionProcessController', () => {
  let controller: SelectionProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionProcessController],
    }).compile();

    controller = module.get<SelectionProcessController>(SelectionProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
