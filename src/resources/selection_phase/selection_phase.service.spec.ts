import { Test, TestingModule } from '@nestjs/testing';
import { SelectionPhaseService } from './selection_phase.service';
import { EntityManager, Repository } from 'typeorm';
import { SelectionPhase } from './entities/selection_phase.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateSelectionphaseDto } from './dto/create-selection_phase.dto';

describe('SelectionPhaseService', () => {
  let service: SelectionPhaseService;
  let phaseRepository: Repository<SelectionPhase>;
  let entityManager: EntityManager;

  const mockPhase = {
    SPH: 2,
    description:'Testing',
    order: 3,
    process: 'Process test',
    feedback: undefined,
    selectionProcess: undefined,
  }

  const mockPhaseRepository = {
    findAll: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  }

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
      providers: [SelectionPhaseService,
        {
          provide: getRepositoryToken(SelectionPhase),
          useValue: mockPhaseRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<SelectionPhaseService>(SelectionPhaseService);
    phaseRepository = module.get<Repository<SelectionPhase>>(
      getRepositoryToken(SelectionPhase),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Phases', async () => {
      jest.spyOn(phaseRepository, 'find').mockResolvedValue([mockPhase]);

      const result = await service.findAll();

      expect(phaseRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockPhase]);
    }); 
  })

  describe('update', () => {
    it('should update a phase and return the updated phase', async () => {
      const updatedPhaseDto = { description: 'Test' };
      const updatedPhase = { ...mockPhase, ...updatedPhaseDto };
  
      jest.spyOn(phaseRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(phaseRepository, 'findOne').mockResolvedValue(updatedPhase);
  
      const result = await service.update(
        mockPhase.SPH,
        updatedPhaseDto,
      );
  
      expect(phaseRepository.update).toHaveBeenCalledWith(
        mockPhase.SPH,
        updatedPhaseDto,
      );
      expect(phaseRepository.findOne).toHaveBeenCalledWith({
        where: { SPH: mockPhase.SPH,},
      });
      expect(result).toEqual(updatedPhaseDto);
    });
  });

  describe('create', () => {
    it('should create a new phase', async () => {
      const createPhaseDto: CreateSelectionphaseDto = {
        SPH: 2,
        description:'Testing',
        order: 3,
        process: 'Process test',
      };
  
      console.log('Testing create method with DTO:', createPhaseDto);
  
      const newPhase = {
        ...createPhaseDto,
        selectionProcess: undefined,
        feedback: undefined,
      };
  
      jest.spyOn(phaseRepository, 'save').mockResolvedValue(newPhase);
  
      const result = await service.create(createPhaseDto);
  
      console.log('Result of create method:', result);
  
      expect(phaseRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createPhaseDto),
      );
      expect(result).toEqual(newPhase);
    });
  });
});
