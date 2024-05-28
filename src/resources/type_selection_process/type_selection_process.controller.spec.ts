import { Test, TestingModule } from '@nestjs/testing';
import { TypeSelectionProcessController } from './type_selection_process.controller';
import { TypeSelectionProcessService } from './type_selection_process.service';

describe('TypeSelectionProcessController', () => {
  let controller: TypeSelectionProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeSelectionProcessController],
      providers: [TypeSelectionProcessService],
    }).compile();

    controller = module.get<TypeSelectionProcessController>(TypeSelectionProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
