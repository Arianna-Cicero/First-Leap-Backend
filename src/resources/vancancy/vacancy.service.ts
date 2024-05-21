import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacancyService {
  create(createVacancyDto: CreateVacancyDto) {
    const { title, description, Job_OfferJO_id } = createVacancyDto;

    if (!title || !description || !Job_OfferJO_id) {
      throw new BadRequestException(
        'Title, description, and job offer are required.',
      );
    }

    return 'This action adds a new vacancy';
  }

  findAll() {
    return `This action returns all vacancy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacancy`;
  }

  update(id: number, updateVacancyDto: UpdateVacancyDto) {
    return `This action updates a #${id} vacancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacancy`;
  }
}
