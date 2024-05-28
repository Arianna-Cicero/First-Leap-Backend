import { Test, TestingModule } from '@nestjs/testing';
import { CandidateService } from './candidate.service';
import { EntityManager, Repository } from 'typeorm';
import { Candidate } from './entities/candidate.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

describe('CandidateService', () => {
  let service: CandidateService;
  let candidateRepository: Repository<Candidate>;
  let entityManager: EntityManager;

  const mockCandidate = {
    cv: undefined,
    skills: 'Back-end developer',
    experience: '3 years of work experience',
    User_id: 1,
    name: 'Joao',
    username: 'joaotest',
    password: 'joaotest',
    number: 3192783,
    email: 'test@gmail.com',
    birth_date: undefined,
    emailverification: undefined,
    candidate_candidacy: undefined,
    address: undefined,
    utilizador: {
      User_id: 1,
      name: 'Joao',
      username: 'joaotest',
      password: 'joaotest',
      number: 3192783,
      email: 'test@gmail.com',
      birth_date: undefined,
      emailverification: undefined,
      address: undefined,
    },
  };

  const mockCandidateRepository = {
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
        CandidateService,
        {
          provide: getRepositoryToken(Candidate),
          useValue: mockCandidateRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<CandidateService>(CandidateService);
    candidateRepository = module.get<Repository<Candidate>>(getRepositoryToken(Candidate));
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Candidates', async () => {
      jest.spyOn(candidateRepository, 'find').mockResolvedValue([mockCandidate]);

      const result = await service.findAll();

      expect(candidateRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockCandidate]);
    });
  });

  // describe('create', () => {
  //   it('should create a new candidate', async () => {
  //     const createCandidateDto: CreateCandidateDto = {
  //       User_id: 1,
  //       name: 'Joao',
  //       username: 'joaotest',
  //       password: 'joaotest',
  //       cv: undefined,
  //       skills: 'Back-end developer',
  //       experience: '3 years of work experience',
  //       number: 3192783,
  //       email: 'test@gmail.com',
  //       birth_date: undefined,
  //       emailverification: undefined,
  //       address: undefined,
  //     };

  //     const createUtilizadorDto: CreateUtilizadorDto = {
  //       User_id: 1,
  //       name: 'Joao',
  //       username: 'joaotest',
  //       password: 'joaotest',
  //       number: 3192783,
  //       email: 'test@gmail.com',
  //       birth_date: undefined,

  //     };

  //     const newCandidate = new Candidate();
  //     Object.assign(newCandidate, createCandidateDto);
  //     newCandidate.utilizador = createUtilizadorDto;

  //     jest.spyOn(candidateRepository, 'save').mockResolvedValue(newCandidate);

  //     const result = await service.create(createCandidateDto, createUtilizadorDto);

  //     expect(candidateRepository.save).toHaveBeenCalledWith(expect.objectContaining({
  //       ...createCandidateDto,
  //       utilizador: expect.objectContaining(createUtilizadorDto),
  //     }));
  //     expect(result).toEqual('Candidato criado');
  //   });
  // });

});
