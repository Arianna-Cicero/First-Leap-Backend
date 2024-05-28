import { Test, TestingModule } from '@nestjs/testing';
import { VacancyService } from './vacancy.service';
import { Repository } from 'typeorm';
import { Vacancy } from './entities/vacancy.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

describe('VacancyService', () => {
  let service: VacancyService;
  let vacancyRepository: Repository<Vacancy>;

  const mockVacancy = {
    vacancy_id: 2,
    title: 'Test',
    description: 'Test',
    joboffer: undefined,
    selectionProcess: undefined,
    candidate: undefined,
  };

  const mockVacancyRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacancyService,
        {
          provide: getRepositoryToken(Vacancy),
          useValue: mockVacancyRepository,
        },
      ],
    }).compile();

    service = module.get<VacancyService>(VacancyService);
    vacancyRepository = module.get<Repository<Vacancy>>(
      getRepositoryToken(Vacancy),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Vacancy', async () => {
      jest.spyOn(vacancyRepository, 'find').mockResolvedValue([mockVacancy]);

      const result = await service.findAll();

      expect(vacancyRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockVacancy]);
    });
  });

  describe('update', () => {
    it('should update a phase and return the updated phase', async () => {
      const updatedVacancyDto: UpdateVacancyDto = { description: 'Test3123' };
      const updatedVacancy = { ...mockVacancy, ...updatedVacancyDto };

      jest.spyOn(vacancyRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(vacancyRepository, 'findOne').mockResolvedValue(updatedVacancy);

      const result = await service.update(
        mockVacancy.vacancy_id,
        updatedVacancyDto,
      );

      expect(vacancyRepository.update).toHaveBeenCalledWith(
        mockVacancy.vacancy_id,
        updatedVacancyDto,
      );
      expect(vacancyRepository.findOne).toHaveBeenCalledWith({
        where: { vacancy_id: mockVacancy.vacancy_id },
      });
      expect(result).toEqual(updatedVacancy);
    });
  });

  describe('create', () => {
    it('should create a new phase', async () => {
      const createVacancyDto: CreateVacancyDto = {
        vacancy_id: 3,
        title: 'FJAS',
        description: 'Testing',
        Job_OfferJO_id: 1,
      };

      const newVacancy = {
        ...createVacancyDto,
        selectionProcess: undefined,
        candidate: undefined, 
        joboffer: undefined,
      };

      jest.spyOn(vacancyRepository, 'create').mockReturnValue(newVacancy);
      jest.spyOn(vacancyRepository, 'save').mockResolvedValue(newVacancy);

      const result = await service.create(createVacancyDto);

      expect(vacancyRepository.create).toHaveBeenCalledWith(createVacancyDto);
      expect(vacancyRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createVacancyDto),
      );
      expect(result).toEqual(newVacancy);
    });
  });
});
