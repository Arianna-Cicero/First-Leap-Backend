import { Test, TestingModule } from '@nestjs/testing';
import { JobtypeController } from './jobtype.controller';
import { JobtypeService } from './jobtype.service';

describe('JobtypeController', () => {
  let controller: JobtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobtypeController],
      providers: [JobtypeService],
    }).compile();

    controller = module.get<JobtypeController>(JobtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
