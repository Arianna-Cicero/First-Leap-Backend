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
      verified: false, 
      emailVerification: undefined
    },
    postalcode: {
      pc: 1,
      localidade: 'City',
      address: [],
    },
    company: {
      company_id: 1,
      name: 'Company',
      number: 3127931627,
      address: [],
    },
  };

  const mockAddressRepository = {
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
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEntityManager,
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
    it('should return an array of addresses', async () => {
      jest.spyOn(addressRepository, 'find').mockResolvedValue([mockAddress]);

      const result = await service.findAll();

      expect(addressRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockAddress]);
    });
  });

  describe('update', () => {
    it('should update an address and return the updated address', async () => {
      const updateAddressDto = { street: 'New Street' };
      const updatedAddress = { ...mockAddress, ...updateAddressDto };

      jest.spyOn(addressRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(addressRepository, 'findOne').mockResolvedValue(updatedAddress);

      const result = await service.update(mockAddress.address_id, updateAddressDto);

      expect(addressRepository.update).toHaveBeenCalledWith(mockAddress.address_id, updateAddressDto);
      expect(addressRepository.findOne).toHaveBeenCalledWith({ where: { address_id: mockAddress.address_id } });
      expect(result).toEqual(updatedAddress);
    });
  });

  describe('create', () => {
    it('should create a new address', async () => {
      const createAddressDto = {
        address_id: 1, // Provide address_id as per the validation requirement
        street: 'Rua do Orvalho',
        city: 'Porto',
        country: 'Espanha',
        state: 'Florida',
      };

      const newAddress = {
        ...createAddressDto,
        utilizador: undefined, // Assuming nested entities are not set in this example
        postalcode: undefined,
        company: undefined,
      };

      jest.spyOn(addressRepository, 'save').mockResolvedValue(newAddress);

      const result = await service.create(createAddressDto);

      expect(addressRepository.save).toHaveBeenCalledWith(createAddressDto);
      expect(result).toEqual(newAddress);
    });
  });
});
