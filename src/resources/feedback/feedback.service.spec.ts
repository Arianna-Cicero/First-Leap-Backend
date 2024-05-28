import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { Feedback } from './entities/feedback.entity';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let feedbackRepository: Repository<Feedback>;
  let entityManager: EntityManager;

  const mockFeedback = {
    feedback_id: 3,
    feedback_desc:'Entrevista bastante positiva',
    SelectionPhase: undefined,
  }

  const mockFeedbackRepository = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockEntityManager = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackService,
        {
          provide: getRepositoryToken(Feedback),
          useValue: mockFeedbackRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    feedbackRepository = module.get<Repository<Feedback>>(
      getRepositoryToken(Feedback),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of feedbacks', async () => {
      jest.spyOn(feedbackRepository, 'find').mockResolvedValue([mockFeedback]);

      const result = await service.findAll();

      expect(feedbackRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockFeedback]);
    });
  });

  describe('update', () => {
    it('should update a feedback and return the updated feedback', async () => {
      const updatedFeedbackDto = { feedback_desc: 'O candidato tem o perfil correto' };
      const updatedFeedback = { ...mockFeedback, ...updatedFeedbackDto };
  
      jest.spyOn(feedbackRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(feedbackRepository, 'findOne').mockResolvedValue(updatedFeedback);
  
      const result = await service.update(
        mockFeedback.feedback_id,
        updatedFeedbackDto,
      );
  
      expect(feedbackRepository.update).toHaveBeenCalledWith(
        mockFeedback.feedback_id,
        updatedFeedbackDto,
      );
      expect(feedbackRepository.findOne).toHaveBeenCalledWith({
        where: { feedback_id: mockFeedback.feedback_id },
      });
      expect(result).toEqual(updatedFeedback);
    });
  });
  

describe('create', () => {
  it('should create a new company', async () => {
    const createFeedbackDto: CreateFeedbackDto = {
      feedback_id: 1,
      feedback_desc: 'Test feedback',
    };

    console.log('Testing create method with DTO:', createFeedbackDto);

    const newFeedback = {
      ...createFeedbackDto,
      SelectionPhase: undefined,
    };

    jest.spyOn(feedbackRepository, 'save').mockResolvedValue(newFeedback);

    const result = await service.create(createFeedbackDto);

    console.log('Result of create method:', result);

    expect(feedbackRepository.save).toHaveBeenCalledWith(
      expect.objectContaining(createFeedbackDto),
    );
    expect(result).toEqual(newFeedback);
  });
});
});
