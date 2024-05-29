import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  private questions = [
    { question: 'What is 2 + 2?', answer: '4' },
    { question: 'What is the capital of France?', answer: 'Paris' },
    {
      question: 'What is the largest planet in our solar system?',
      answer: 'Jupiter',
    },
    { question: 'What is the boiling point of water?', answer: '100' },
    { question: 'Who wrote "Romeo and Juliet"?', answer: 'Shakespeare' },
  ];

  getQuestions() {
    return this.questions.map((q) => q.question);
  }

  checkAnswers(userAnswers: string[]): number {
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer.toLowerCase() === this.questions[index].answer.toLowerCase()) {
        score++;
      }
    });
    return score;
  }
}
