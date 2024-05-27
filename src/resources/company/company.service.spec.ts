import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { EntityManager, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepository: Repository<Company>;
  let entityManager: EntityManager;

  const mockCompany = {
    company_id: 2,
    name: 'CodeCraft',
    number: 68372163782,
    address: undefined,
  };

  const mockCompanyRepository = {
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
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: mockCompanyRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<Repository<Company>>(
      getRepositoryToken(Company),
    );
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      jest.spyOn(companyRepository, 'find').mockResolvedValue([mockCompany]);

      const result = await service.findAll();

      expect(companyRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockCompany]);
    });
  });

  describe('update', () => {
    it('should update an company and return the updated company', async () => {
      const updatedCompanyDto = { name: 'CodeCrafting' };
      const updatedCompany = { ...mockCompany, ...updatedCompanyDto };

      jest.spyOn(companyRepository, 'update').mockResolvedValue(undefined);
      jest
        .spyOn(companyRepository, 'findOne')
        .mockResolvedValue(updatedCompany);

      const result = await service.update(
        mockCompany.company_id,
        updatedCompanyDto,
      );

      expect(companyRepository.update).toHaveBeenCalledWith(
        mockCompany.company_id,
        updatedCompanyDto,
      );
      expect(companyRepository.findOne).toHaveBeenCalledWith({
        where: { company_id: mockCompany.company_id },
      });
      expect(result).toEqual(updatedCompany);
    });
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const createCompanyDto: CreateCompanyDto = {
        company_id: 1,
        name: 'Test Company',
        number: 1234567890,
      };

      console.log('Testing create method with DTO:', createCompanyDto);

      const newCompany = {
        ...createCompanyDto,
        address: undefined,
      };

      jest.spyOn(companyRepository, 'save').mockResolvedValue(newCompany);

      const result = await service.create(createCompanyDto);

      console.log('Result of create method:', result);

      expect(companyRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createCompanyDto),
      );
      expect(result).toEqual(newCompany);
    });
  });
});
