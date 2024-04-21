import { Test, TestingModule } from '@nestjs/testing';
import { SelectionProcessController } from './selection_process.controller';
import { SelectionProcessService } from './selection_process.service';

describe('SelectionProcessController', () => {
  let controller: SelectionProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionProcessController],
      providers: [SelectionProcessService],
    }).compile();

    controller = module.get<SelectionProcessController>(SelectionProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
