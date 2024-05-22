import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import exp from 'constants';

describe('CompanyController', () => {
  let controller: CompanyController;

  const mockCompanyService = {
    create: jest.fn(dto => ({
      Company_id: Date.now(),
      ...dto
    })),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto
    }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    }).overrideProvider(CompanyService).useValue(mockCompanyService).compile();

    controller = module.get<CompanyController>(CompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      company_id: 1,
      name: 'CodeCraft',
      number: '939394994',
    }

    const createdCompany = await controller.create(dto);
    expect(createdCompany).toEqual({
      company_id: expect.any(Number),
      name : dto.name,
      number : dto.number
    });

    expect(mockCompanyService.create).toHaveBeenCalledWith(dto);
  })
});
