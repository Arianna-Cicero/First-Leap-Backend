import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
describe('FeedbackController', () => {
  let controller: FeedbackController;

  const mockFeedbackService = {
    create: jest.fn(dto => ({
      feedback_id: Date.now(),
      ...dto
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
    }).overrideProvider(FeedbackService).useValue(mockFeedbackService).compile();

    controller = module.get<FeedbackController>(FeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      feedback_id: 1,
      feedback_desc: 'Entrevista bastante positiva'
    }
    const createdFeedback = await controller.create(dto);
    expect(createdFeedback).toEqual({
      feedback_id: expect.any(Number),
      feedback_desc: dto.feedback_desc
    })

    expect(mockFeedbackService.create).toHaveBeenCalledWith(dto)
  })
});
