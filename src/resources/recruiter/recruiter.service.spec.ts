import { Test, TestingModule } from '@nestjs/testing';
import { RecruiterService } from './recruiter.service';
import { EntityManager, Repository } from 'typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

describe('RecruiterService', () => {
  let service: RecruiterService;
  let recruiterRepository: Repository<Recruiter>;
  let entityManager: EntityManager;

  const mockRecruiter = {
    name: 'Cris',
    position: 'RH',
    selectionProcess: undefined,
    User_id: 23,
    username: 'Ronaldo',
    password: 'siu',
    number: 938208,
    email: 'cris@gmail.com',
    birth_date: undefined,
    company: undefined,
    utilizador: undefined,
    joboffer: undefined,
    verified: false,
    emailVerification: undefined,
    address: [
      {
        address_id: 1,
        street: 'Rua do Raio',
        city: 'Maracaibo',
        country: 'Portugal',
        state: 'Texas',
        postalcode: undefined,
        company: undefined,
        utilizador: undefined,
      },
    ],
    emailverification: undefined,
  };

  const mockRecruiterRepository = {
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
      providers: [
        RecruiterService,
        {
          provide: getRepositoryToken(Recruiter),
          useValue: mockRecruiterRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<RecruiterService>(RecruiterService);
    recruiterRepository = module.get<Repository<Recruiter>>(
      getRepositoryToken(Recruiter),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Recruiters', async () => {
      jest
        .spyOn(recruiterRepository, 'find')
        .mockResolvedValue([mockRecruiter]);

      const result = await service.findAll();

      expect(recruiterRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockRecruiter]);
    });
  });

  // describe('update', () => {
  //   it('should update a recruiter and return the updated recruiter', async () => {
  //     const updatedRecruiterDto = { position: 'Test' };

  //     jest.spyOn(recruiterRepository, 'update').mockResolvedValue(undefined);
  //     jest.spyOn(recruiterRepository, 'findOne').mockResolvedValue(mockRecruiter);

  //     const result = await service.update(mockRecruiter.User_id, updatedRecruiterDto);

  //     expect(recruiterRepository.update).toHaveBeenCalledWith(
  //       mockRecruiter.User_id,
  //       expect.objectContaining(updatedRecruiterDto), // Ensure that the updated fields are correctly passed
  //     );
  //     expect(recruiterRepository.findOne).toHaveBeenCalledWith({
  //       where: { User_id: mockRecruiter.User_id,},
  //     });
  //     expect(result).toEqual(mockRecruiter); // Return the updated recruiter, not the DTO
  //   });
  // });

  describe('create', () => {
    it('should create a new result', async () => {
      const createRecruiterDto: CreateRecruiterDto = {
        name: 'Cris',
        position: 'RH',
      };

      const createUtilizadorDto: CreateUtilizadorDto = {
        User_id: 23,
        username: 'Ronaldo',
        password: 'siu',
        number: 938208,
        email: 'cris@gmail.com',
        birth_date: undefined,
        name: 'Cris',
      };

      const newRecruiter: Recruiter = {
        ...createRecruiterDto,
        ...createUtilizadorDto,
        selectionProcess: undefined,
        address: [],
        company: undefined,
        utilizador: undefined,
        joboffer: undefined,
        verified: undefined,
        emailVerification: undefined,
      };

      jest.spyOn(recruiterRepository, 'save').mockResolvedValue(newRecruiter);

      const result = await service.create(
        createRecruiterDto,
        createUtilizadorDto,
      );

      expect(recruiterRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(newRecruiter),
      );
      expect(result).toEqual(newRecruiter);
    });
  });
});
