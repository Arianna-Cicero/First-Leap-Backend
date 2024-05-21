import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly entityManager: EntityManager,
  ) {}
  // async create(
  //   createAdminDto: CreateAdminDto,
  //   createUtilizadorDto: CreateUtilizadorDto,
  // ) {
  //   const admin = new Admin(createAdminDto, createUtilizadorDto);
  //   await this.adminRepository.save(admin);
  //   return 'Admin creado';
  // }

  async findAll() {
    return await this.adminRepository.find();
  }

  async findOne(id: number) {
    return this.adminRepository.find({
      where: {
        admin_id: id,
      },
    });
  }

  // async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
  //   await this.adminRepository.update(id, updateAdminDto);
  //   const adminUpdated = await this.adminRepository.findOne({
  //     where: {
  //       admin_id: id,
  //     },
  //   });
  //   this.adminRepository.find;
  //   if (!adminUpdated) {
  //     throw new Error('Admin no encontrado');
  //   }
  //   return adminUpdated;
  // }

  async remove(id: number) {
    await this.adminRepository.delete(id);
    return `admin de id #${id} eliminado`;
  }
}
