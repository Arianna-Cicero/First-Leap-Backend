import { Test, TestingModule } from '@nestjs/testing';
import { UtilizadorService } from './utilizador.service';
import { Repository, EntityManager } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';

describe('UtilizadorService', () => {
  let service: UtilizadorService;
  let utilizadorRepository: Repository<Utilizador>;

  const mockUtilizador = {
    User_id: 1,
    name: 'John Doe',
    username: 'johndoe',
    password: 'password',
    number: 123456789,
    email: 'johndoe@example.com',
    birth_date: new Date('1990-01-01'),
    address: [],
    emailverification: null,
  };

  const mockUtilizadorRepository = {
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
        UtilizadorService,
        {
          provide: getRepositoryToken(Utilizador),
          useValue: mockUtilizadorRepository,
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UtilizadorService>(UtilizadorService);
    utilizadorRepository = module.get<Repository<Utilizador>>(
      getRepositoryToken(Utilizador),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of Utilizador', async () => {
      jest.spyOn(utilizadorRepository, 'find').mockResolvedValue([mockUtilizador]);

      const result = await service.findAll();

      expect(utilizadorRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUtilizador]);
    });
  });

  describe('create', () => {
    it('should create a new utilizador', async () => {
      const createUtilizadorDto: CreateUtilizadorDto = {
        User_id: 2,
        name: 'Jane Doe',
        number: 987654321,
        email: 'janedoe@example.com',
        birth_date: new Date('1992-02-02'),
        username: 'jsna',
        password: 'password123',
      };

      const hashedPassword = 'hashedPassword123';
      const newUtilizador = {
        ...createUtilizadorDto,
        password: hashedPassword,
      };

      const encodePasswordMock = jest.fn().mockResolvedValue(hashedPassword);

      // Ensure service uses the mocked encodePassword function
      jest.spyOn(service as any, 'encodePassword', 'get').mockReturnValue(encodePasswordMock);

      // Mock the save method to resolve with the new utilizador
      mockUtilizadorRepository.save.mockResolvedValue(newUtilizador);

      const result = await service.create(createUtilizadorDto);

      expect(encodePasswordMock).toHaveBeenCalledWith(createUtilizadorDto.password);
      expect(mockUtilizadorRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...createUtilizadorDto,
          password: hashedPassword,
        }),
      );
      expect(result).toEqual(newUtilizador);
    });
  });

  describe('update', () => {
    it('should update a utilizador and return the updated utilizador', async () => {
      const updatedUtilizadorDto: UpdateUtilizadorDto = { name: 'John Doe Updated' };
      const updatedUtilizador = { ...mockUtilizador, ...updatedUtilizadorDto };

      jest.spyOn(utilizadorRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(utilizadorRepository, 'findOne').mockResolvedValue(updatedUtilizador);

      const result = await service.update(
        mockUtilizador.User_id,
        updatedUtilizadorDto,
      );

      expect(utilizadorRepository.update).toHaveBeenCalledWith(
        mockUtilizador.User_id,
        updatedUtilizadorDto,
      );
      expect(utilizadorRepository.findOne).toHaveBeenCalledWith({
        where: { User_id: mockUtilizador.User_id },
      });
      expect(result).toEqual(updatedUtilizador);
    });
  });

  // describe('remove', () => {
  //   it('should remove a utilizador', async () => {
  //     jest.spyOn(utilizadorRepository, 'delete').mockResolvedValue(undefined);

  //     await service.remove(mockUtilizador.User_id);

  //     expect(utilizadorRepository.delete).toHaveBeenCalledWith(mockUtilizador.User_id);
  //   });
  // });
});
