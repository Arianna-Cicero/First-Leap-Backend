import { Test, TestingModule } from '@nestjs/testing';
import { SelectionPhaseController } from './selection_phase.controller';
import { SelectionPhaseService } from './selection_phase.service';

describe('SelectionPhaseController', () => {
  let controller: SelectionPhaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionPhaseController],
      providers: [SelectionPhaseService],
    }).compile();

    controller = module.get<SelectionPhaseController>(SelectionPhaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
