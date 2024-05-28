import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('questions')
  getQuestions() {
    return this.quizService.getQuestions();
  }

  @Post('answers')
  checkAnswers(@Body() userAnswers: string[]) {
    const score = this.quizService.checkAnswers(userAnswers);
    return { score };
  }
}
