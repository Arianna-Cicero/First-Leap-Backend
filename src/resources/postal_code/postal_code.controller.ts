import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostalCodeService } from './postal_code.service';
import { CreatePostalCodeDto } from './dto/create-postal_code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal_code.dto';

@Controller('postal-code')
export class PostalCodeController {
  constructor(private readonly postalCodeService: PostalCodeService) {}

  @Post()
  async create(@Body() createPostalCodeDto: CreatePostalCodeDto) {
    return this.postalCodeService.create(createPostalCodeDto);
  }

  @Get()
  async findAll() {
    return this.postalCodeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postalCodeService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostalCodeDto: UpdatePostalCodeDto,
  ) {
    return this.postalCodeService.update(+id, updatePostalCodeDto);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.postalCodeService.remove(+id);
  // }
}
