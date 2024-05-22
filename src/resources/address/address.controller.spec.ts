import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { UtilizadorService } from '../utilizador/utilizador.service';

describe('AddressController', () => {
  let controller: AddressController;

  const mockAddresService = {
    create: jest.fn(dto => ({
      candidate_id : Date.now(),
      ...dto
    }))
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService],
    }).overrideProvider(UtilizadorService).useValue(mockAddresService).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should creact a address', async () => {
    const dto = {
      address_id: 1,
      street: 'Rua da liberdade', 
      city: 'Braga',
      state: 'Braga',
      country: 'Portugal',
    };

    const createdAddress = await controller.create(dto);
    expect(createdAddress).toEqual({
      address_id: expect.any(Number),
      street: dto.street,
      city: dto.city,
      state: dto.state,
      country: dto.country,
    })
    expect(mockAddresService.create).toHaveBeenCalledWith(dto);
  })
});
