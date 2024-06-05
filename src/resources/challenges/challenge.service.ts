import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { VM } from 'vm2';
import { Challenge } from './entities/challenge.entity';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    const challenge = this.challengesRepository.create(createChallengeDto);
    return this.challengesRepository.save(challenge);
  }

  async findAll(): Promise<Challenge[]> {
    return await this.challengesRepository.find();
  }

  async findOne(id: number): Promise<Challenge> {
    const challenge = await this.challengesRepository.findOne({
      where: { challenge_id: id },
    });
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge;
  }

  //funciona
  async longestWord(userCode, input, expectedOutput) {
    const vm = new VM({
      timeout: 1000,
    });
    try {
      vm.run(userCode);

      // Check if the function is defined
      // if (typeof vm.run('typeof findLongestWord') !== 'function') {
      //   return {
      //     success: false,
      //     message: "Function 'findLongestWord' is not defined.",
      //     expectedOutput: `${expectedOutput}`,
      //     output:  `Got: ${result}`
      //   };
      // }

      const result = vm.run(`findLongestWord("${input}")`);
      if (result !== expectedOutput) {
        return {
          success: false,
          message: `Test failed. Input: "${input}", Expected: ${expectedOutput}, Got: ${result}`,
        };
      }

      return { success: true, message: 'Test passed!', result: result };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  }

  async countVowels(userCode: string, input: string, expectedOutput: number) {
    const vm = new VM({
      timeout: 1000,
    });

    try {
      vm.run(userCode);

      const functionExists = vm.run('typeof countVowels') === 'function';
      if (!functionExists) {
        return {
          success: false,
          message: "Function 'countVowels' is not defined.",
        };
      }

      const result = vm.run(`countVowels("${input}")`);
      if (result !== expectedOutput) {
        return {
          success: false,
          message: `Test failed. Input: "${input}", Expected: ${expectedOutput}, Got: ${result}`,
        };
      }

      return { success: true, message: 'Test passed!', result: result };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  }

  async reverseString(userCode: string, input: string, expectedOutput: string) {
    const vm = new VM({
      timeout: 1000,
    });

    try {
      // Run the user code in the VM
      vm.run(userCode);

      // Check if the function is defined
      const functionExists = vm.run('typeof reverseString') === 'function';
      if (!functionExists) {
        return {
          success: false,
          message: "Function 'reverseString' is not defined.",
        };
      }

      // Run the provided test case
      const result = vm.run(`reverseString("${input}")`);
      if (result !== expectedOutput) {
        return {
          success: false,
          message: `Test failed. Input: "${input}", Expected: "${expectedOutput}", Got: "${result}"`,
        };
      }

      return { success: true, message: 'Test passed!', result: result };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  }

  async sumArray(userCode: string, input: string, expectedOutput: number) {
    const vm = new VM({
      timeout: 1000,
    });

    try {
      // Run the user code in the VM
      vm.run(userCode);

      // Check if the function is defined
      const functionExists = vm.run('typeof sumArray') === 'function';
      if (!functionExists) {
        return {
          success: false,
          message: "Function 'sumArray' is not defined.",
        };
      }

      // Run the provided test case
      const result = vm.run(`sumArray(${input})`);
      if (result !== expectedOutput) {
        return {
          success: false,
          message: `Test failed. Input: "${input}", Expected: ${expectedOutput}, Got: ${result}`,
        };
      }

      return { success: true, message: 'Test passed!', result: result };
    } catch (error) {
      return { success: false, message: `Error: ${error.message}` };
    }
  }
}
