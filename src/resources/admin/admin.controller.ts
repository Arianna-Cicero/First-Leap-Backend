import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(
    @Body() createAdminDto: CreateAdminDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ) {
    return this.adminService.create(createAdminDto, createUtilizadorDto);
  }

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateAdminDto: UpdateAdminDto,
  // ) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
