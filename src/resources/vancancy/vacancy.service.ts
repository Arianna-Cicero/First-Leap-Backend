import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacancy } from './entities/vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    // const { title, description, Job_OfferJO_id } = createVacancyDto;

    // if (!title || !description || !Job_OfferJO_id) {
    //   throw new BadRequestException(
    //     'Title, description, and job offer are required.',
    //   );
    // }

    const vacancy = this.vacancyRepository.create(createVacancyDto);
    return await this.vacancyRepository.save(vacancy);
  }

  async findAll(): Promise<Vacancy[]> {
    return await this.vacancyRepository.find();
  }

  async findOne(id: number): Promise<Vacancy> {
    return await this.vacancyRepository.findOne({ where: { vacancy_id: id } });
  }

  async update(
    id: number,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    await this.vacancyRepository.update(id, updateVacancyDto);
    return await this.vacancyRepository.findOne({ where: { vacancy_id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.vacancyRepository.delete(id);
  }
}
