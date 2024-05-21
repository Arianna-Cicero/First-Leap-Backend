// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { CandidateCandidacyService } from './candidate_candidacy.service';
// import { CreateCandidateCandidacyDto } from './dto/create-candidate_candidacy.dto';
// import { UpdateCandidateCandidacyDto } from './dto/update-candidate_candidacy.dto';

// @Controller('candidate-candidacy')
// export class CandidateCandidacyController {
//   constructor(
//     private readonly candidateCandidacyService: CandidateCandidacyService,
//   ) {}

//   @Post()
//   create(@Body() createCandidateCandidacyDto: CreateCandidateCandidacyDto) {
//     return this.candidateCandidacyService.create(createCandidateCandidacyDto);
//   }

//   @Get()
//   findAll() {
//     return this.candidateCandidacyService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.candidateCandidacyService.findOne(+id);
//   }

//   @Patch(':id')
//   update(
//     @Param('id') id: string,
//     @Body() updateCandidateCandidacyDto: UpdateCandidateCandidacyDto,
//   ) {
//     return this.candidateCandidacyService.update(
//       +id,
//       updateCandidateCandidacyDto,
//     );
//   }

//   // @Delete(':id')
//   // remove(@Param('id') id: string) {
//   //   return this.candidateCandidacyService.remove(+id);
//   // }
// }
