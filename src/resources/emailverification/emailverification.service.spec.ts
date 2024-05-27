import { Test, TestingModule } from '@nestjs/testing';
import { Emailverification } from './entities/emailverification.entity';
import { EntityManager, Repository } from 'typeorm';
import { EmailverificationService } from './emailverification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEmailverificationDto } from './dto/create-emailverification.dto';

describe('EmailverificationService', () => {
  let service: EmailverificationService;
  let emailRepository : Repository<Emailverification>
  let entityManager: EntityManager;

  const mockEmail = {
    email_ver_id: 2,
    Verification_code: 34,
    expiry_datetime: undefined,
    utilizador: undefined,
  }

  const mockEmailRepository = {
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
      providers: [EmailverificationService,
        {
          provide: getRepositoryToken(Emailverification),
          useValue: mockEmailRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
        }
      ],
    }).compile();

    service = module.get<EmailverificationService>(EmailverificationService);
    emailRepository = module.get<Repository<Emailverification>>(getRepositoryToken(Emailverification));
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of email verifications', async () => {
      jest.spyOn(emailRepository, 'find').mockResolvedValue([mockEmail]);
      
      const result = await service.findAll();

      expect(emailRepository.find).toHaveBeenCalledWith();
      expect(result).toEqual([mockEmail]);
    })
  })

  describe('update', () => {
    it('should update an email verification and return the updated field', async () => {
      const updatedEmailDto = {Verification_code: 3214};
      const updatedEmail = {...mockEmail, ...updatedEmailDto};

      jest.spyOn(emailRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(emailRepository, 'findOne').mockResolvedValue(updatedEmail);

      const result = await service.update(mockEmail.email_ver_id,  updatedEmailDto);

      expect(emailRepository.update).toHaveBeenCalledWith(mockEmail.email_ver_id, updatedEmailDto);
      expect(emailRepository.findOne).toHaveBeenCalledWith({where: {email_ver_id: mockEmail.email_ver_id}})
      expect(result).toEqual(updatedEmail);
    })
  })

  describe('create', () => {
    it('should create a new email verification', async () => {
      const createEmailDto: CreateEmailverificationDto = {
        email_ver_id: 1,
        Verification_code: 432,
        expiry_datetime: undefined,
      };
  
      console.log('Testing create method with DTO:', createEmailDto);
  
      const newEmail = {
        ...createEmailDto,
        utilizador: undefined,
      };
  
      jest.spyOn(emailRepository, 'save').mockResolvedValue(newEmail);
  
      const result = await service.create(createEmailDto);
  
      console.log('Result of create method:', result);
  
      expect(emailRepository.save).toHaveBeenCalledWith(
        expect.objectContaining(createEmailDto),
      );
      expect(result).toEqual(newEmail);
    });
  });
  

});
