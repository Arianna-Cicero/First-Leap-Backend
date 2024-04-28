import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailverificationService } from './emailverification.service';
import { CreateEmailverificationDto } from './dto/create-emailverification.dto';
import { UpdateEmailverificationDto } from './dto/update-emailverification.dto';

@Controller('emailverification')
export class EmailverificationController {
  constructor(
    private readonly emailverificationService: EmailverificationService,
  ) {}

  @Post()
  async create(@Body() createEmailverificationDto: CreateEmailverificationDto) {
    return this.emailverificationService.create(createEmailverificationDto);
  }

  @Get()
  async findAll() {
    return this.emailverificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.emailverificationService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmailverificationDto: UpdateEmailverificationDto,
  ) {
    return this.emailverificationService.update(
      +id,
      updateEmailverificationDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.emailverificationService.remove(+id);
  }
}
