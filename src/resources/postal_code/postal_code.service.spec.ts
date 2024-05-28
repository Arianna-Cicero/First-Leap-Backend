import { Test, TestingModule } from '@nestjs/testing';
import { PostalCodeService } from './postal_code.service';
import { PostalCode } from './entities/postal_code.entity';
import { EntityManager, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePostalCodeDto } from './dto/create-postal_code.dto';

describe('PostalCodeService', () => {
  let service: PostalCodeService;
  let postalRepository: Repository<PostalCode>;
  let entityManager: EntityManager;

  const mockPostal = {
    pc: 4,
    localidade: 'Aveleda',
    address: undefined,
  }

  const mockPostalRepository = {
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
      providers: [PostalCodeService,
        {
          provide: getRepositoryToken(PostalCode),
          useValue: mockPostalRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<PostalCodeService>(PostalCodeService);
    postalRepository = module.get<Repository<PostalCode>>(
      getRepositoryToken(PostalCode),
    )
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of postal codes', async () => {
      jest.spyOn(postalRepository, 'find').mockResolvedValue([mockPostal]);

      const result = await service.findAll();

      expect(postalRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockPostal]);
    }); 
  })

  describe('update', () => {
    it('should update a postal and return the updated postal', async () => {
      const updatedPostalDto = { localidade: 'Celeiros' };
      const updatedPostal = { ...mockPostal, ...updatedPostalDto };
  
      jest.spyOn(postalRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(postalRepository, 'findOne').mockResolvedValue(updatedPostal);
  
      const result = await service.update(
        mockPostal.pc,
        updatedPostalDto,
      );
  
      expect(postalRepository.update).toHaveBeenCalledWith(
        mockPostal.pc,
        updatedPostalDto,
      );
      expect(postalRepository.findOne).toHaveBeenCalledWith({
        where: { pc: mockPostal.pc },
      });
      expect(result).toEqual(updatedPostal);
    });
  });

  describe('create', () => {
    it('should create a new postal code', async () => {
      const createPostalDto: CreatePostalCodeDto = {
        pc: 1,
        localidade: 'Test postal',
      };

      console.log('Testing create method with DTO:', createPostalDto);

      const newPostal = {
        ...createPostalDto,
        address: undefined,
      };

      jest.spyOn(entityManager, 'save').mockResolvedValue(newPostal);

      const result = await service.create(createPostalDto);

      console.log('Result of create method:', result);

      expect(entityManager.save).toHaveBeenCalledWith(
        expect.objectContaining(createPostalDto),
      );
      expect(result).toEqual(newPostal);
    });
  });
});
