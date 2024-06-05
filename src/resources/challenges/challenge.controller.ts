import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entities/challenge.entity';
import { VM } from 'vm2';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengesService: ChallengeService) {}

  @Post()
  create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Post('longest/:id')
  async longestWord(@Param('id') id: number, @Body('code') code: string) {
    const challenge = await this.challengesService.findOne(id);

    // Assuming getChallengeById returns the challenge details including test cases
    if (!challenge) {
      return { success: false, message: 'Challenge not found' };
    }

    const testCase = challenge.test_cases[0];
    const { input, expectedOutput } = testCase;

    const result = this.challengesService.longestWord(
      code,
      input,
      expectedOutput,
    );

    return result;
  }

  @Post('count-vowels/:id')
  async countVowels(@Param('id') id: number, @Body('code') code: string) {
    const challenge = await this.challengesService.findOne(id);

    if (!challenge) {
      return { success: false, message: 'Challenge not found' };
    }

    const results = [];
    for (const testCase of challenge.test_cases) {
      const { input, expectedOutput } = testCase;
      const result = await this.challengesService.countVowels(
        code,
        input,
        expectedOutput,
      );
      results.push(result);
    }

    const allPassed = results.every((result) => result.success);
    return {
      success: allPassed,
      results: results,
      message: allPassed ? 'All tests passed!' : 'Some tests failed.',
    };
  }

  @Post('reverse-string/:id')
  async reverseString(@Param('id') id: number, @Body('code') code: string) {
    const challenge = await this.challengesService.findOne(id);

    if (!challenge) {
      return { success: false, message: 'Challenge not found' };
    }

    const results = [];
    for (const testCase of challenge.test_cases) {
      const { input, expectedOutput } = testCase;
      const result = await this.challengesService.reverseString(
        code,
        input,
        expectedOutput,
      );
      results.push(result);
    }

    const allPassed = results.every((result) => result.success);
    return {
      success: allPassed,
      results: results,
      message: allPassed ? 'All tests passed!' : 'Some tests failed.',
    };
  }

  @Post('sum-array/:id')
  async sumArray(@Param('id') id: number, @Body('code') code: string) {
    const challenge = await this.challengesService.findOne(id);

    if (!challenge) {
      return { success: false, message: 'Challenge not found' };
    }

    const results = [];
    for (const testCase of challenge.test_cases) {
      const { input, expectedOutput } = testCase;
      const result = await this.challengesService.sumArray(
        code,
        input,
        expectedOutput,
      );
      results.push(result);
    }

    const allPassed = results.every((result) => result.success);
    return {
      success: allPassed,
      results: results,
      message: allPassed ? 'All tests passed!' : 'Some tests failed.',
    };
  }

  @Get()
  async findAll(): Promise<Challenge[]> {
    return await this.challengesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Challenge> {
    return await this.challengesService.findOne(id);
  }
}
