import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { Repository, EntityManager } from 'typeorm';
import { Address } from './entities/address.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<Address>;
  let entityManager: EntityManager;

  const mockAddress = {
    address_id: 1,
    street: 'Rua do Raio',
    city: 'Maracaibo',
    country: 'Portugal',
    state: 'Texas',
    utilizador: {
      User_id: 1,
      name: 'User',
      username: 'test',
      password: 'test',
      number: 3192783,
      email: 'test@gmail.com',
      birth_date: undefined,
      address: [],
      emailverification: undefined,
    },
    postalcode: {
      pc: 1,
      localidade: 'City',
      address: [],
    },
    company: {
      company_id: 1,
      name: 'Company',
      number: '3127931627',
      address: [],
    },
  };

  const mockAddressRepository = {
    findAll: jest.fn(), // Correct method name
    find: jest.fn(), // Add find method here
  };

  const mockEntityManager = {
    find: jest.fn(),
    save: jest.fn(),
    // Add other methods if necessary
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository, // Use mockAddressRepository here
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager, // Use mockEntityManager here
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<Repository<Address>>(getRepositoryToken(Address));
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of address', async () => {
      jest.spyOn(addressRepository, 'find').mockResolvedValue([mockAddress]);

      const result = await service.findAll();

      expect(addressRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockAddress]);
    });
  });
});
