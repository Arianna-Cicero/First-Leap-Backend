import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
  private questions = [
    {
      question: 'What is the time complexity of binary search?',
      answer: 'O(log n)',
    },
    {
      question: 'What keyword is used to define a constant in JavaScript?',
      answer: 'const',
    },
    {
      question:
        'What is the main difference between let and var in JavaScript?',
      answer: 'scope',
    },
    {
      question: 'What is the purpose of a constructor in a class?',
      answer: 'initialize',
    },
    {
      question: 'What does SQL stand for?',
      answer: 'Structured Query Language',
    },
    { question: 'What is the output of 3 + "3" in JavaScript?', answer: '33' },
    {
      question: 'Which HTML element is used for the largest heading?',
      answer: '<h1>',
    },
    {
      question: 'What is the file extension for a Python file?',
      answer: '.py',
    },
    {
      question: 'What is the command to install a package using npm?',
      answer: 'npm install',
    },
    {
      question: 'Which CSS property is used to change the text color?',
      answer: 'color',
    },
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
