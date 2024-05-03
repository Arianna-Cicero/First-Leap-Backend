import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const company = new Company(createCompanyDto);
    await this.entityManager.save(company);
    return 'Nova company adicionada';
  }

  async findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    return this.companyRepository.findOne({ where: { company_id: id } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    await this.companyRepository.update(id, updateCompanyDto);
    const updatedCompany = await this.companyRepository.findOne({
      where: { company_id: id },
    });
    await this.companyRepository.find;
    if (!updatedCompany) {
      throw new Error('No se ecnotro la compañia');
    }
    return updatedCompany;
  }

  async remove(id: number) {
    return this.companyRepository.delete(id);
  }
}
