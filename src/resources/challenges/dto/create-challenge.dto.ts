export class CreateChallengeDto {
  typeSpId: number;

  challenge_title: string;

  challenge_description: string;

  test_cases: { input: string; expectedOutput: any }[];

  time_limit: number;
}
