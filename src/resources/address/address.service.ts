import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { EntityManager, Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const address = new Address(createAddressDto);
    await this.addressRepository.save(address);
    return address;
  }

  async findAll() {
    return await this.addressRepository.find();
  }

  async findOne(id: number) {
    return await this.addressRepository.findOne({ where: { address_id: id } });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    await this.addressRepository.update(id, updateAddressDto);
    const addressUpdated = this.addressRepository.findOne({
      where: { address_id: id },
    });
    if (!addressUpdated) {
      throw new Error('Address no encontrado');
    }
    return addressUpdated;
  }

  async remove(id: number) {
    return await this.addressRepository.delete(id);
  }
}
