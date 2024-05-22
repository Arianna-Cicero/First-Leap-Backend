import { Test, TestingModule } from '@nestjs/testing';
import { UtilizadorController } from './utilizador.controller';
import { UtilizadorService } from './utilizador.service';

// npm run test:watch

describe('UtilizadorController', () => {
  let controller: UtilizadorController;
  
  const mockUtilizadorService = {
    create: jest.fn(dto => ({
      User_id: Date.now(),
      ...dto
    })),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UtilizadorController],
      providers: [UtilizadorService],
    }).overrideProvider(UtilizadorService).useValue(mockUtilizadorService).compile();

    controller = module.get<UtilizadorController>(UtilizadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => { 
    const dto = { 
      User_id: 1,
      name: 'Joao',
      username: 'joao123',
      password: 'password123',
      number: 123456789,
      email: 'joao@example.com',
      birth_date: new Date('2000-01-01'),
    };
    const createdUser = await controller.create(dto); 
    expect(createdUser).toEqual({
      User_id: expect.any(Number),
      name: dto.name,
      username: dto.username,
      password: dto.password,
      number: dto.number,
      email: dto.email,
      birth_date: dto.birth_date,
    });

    expect(mockUtilizadorService.create).toHaveBeenCalledWith(dto);
  });
  
  it('should update a user', async () => {
    const dto = { name: 'Pedro' };
    const updatedUser = await controller.update('1', dto);

    expect(updatedUser).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUtilizadorService.update).toHaveBeenCalledWith(1, dto);
  });
});