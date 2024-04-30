import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const admin = new Admin(createAdminDto);
    await this.adminRepository.save(admin);
    return 'Admin creado';
  }

  async findAll() {
    return await this.adminRepository.find();
  }

  async findOne(id: number) {
    return this.adminRepository.find({
      where: {
        admin: id,
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    const adminUpdated = await this.adminRepository.findOne({
      where: {
        admin: id,
      },
    });
    this.adminRepository.find;
    if (!adminUpdated) {
      throw new Error('Admin no encontrado');
    }
    return adminUpdated;
  }

  async remove(id: number) {
    await this.adminRepository.delete(id);
    return `admin de id #${id} eliminado`;
  }
}
