import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

describe('AdminController', () => {
  let controller: AdminController;
  
  const mockAdminService = {
    createAdmin: jest.fn(dto => ({
      User_id: Date.now(),
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService],
    })
    .overrideProvider(AdminService)
    .useValue(mockAdminService)
    .compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an admin', async () => {
    const dto = {
      User_id: 1, 
      position: 'Support',
    };
    const createdAdmin = await controller.create(dto);

    expect(createdAdmin).toEqual({
      User_id: expect.any(Number),
      ...dto,
    });

    expect(mockAdminService.createAdmin).toHaveBeenCalledWith(dto);
  });
});