import { Injectable } from '@nestjs/common';
import { CreateJobOfferDto } from './dto/create-job_offer.dto';
import { UpdateJobOfferDto } from './dto/update-job_offer.dto';
import { EntityManager, Repository } from 'typeorm';
import { JobOffer } from './entities/job_offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateService } from '../candidate/candidate.service';
import { EmailService } from 'src/mailer/sendMail';
import { Candidate } from '../candidate/entities/candidate.entity';
import { ResumeParse } from 'src/cv_validation/resume_parse';
import { SelectionProcess } from '../selection_process/entities/selection_process.entity';
import { CreateSelectionprocessDto } from '../selection_process/dto/create-selection_process.dto';
import { Vacancy } from '../vancancy/entities/vacancy.entity';
import { CreateVacancyDto } from '../vancancy/dto/create-vacancy.dto';
import { Recruiter } from '../recruiter/entities/recruiter.entity';
import { CreateRecruiterDto } from '../recruiter/dto/create-recruiter.dto';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';

@Injectable()
export class JobOfferService {
  constructor(
    @InjectRepository(JobOffer)
    private readonly jobofferRepo: Repository<JobOffer>,
    private readonly entityManger: EntityManager,
    private readonly candidateService: CandidateService,
    private readonly emailService: EmailService,
  ) {}
  private myID: number;
  private acceptedCandidateIds: number[] = [];

  async create(
    createJobOfferDto: CreateJobOfferDto,
    createSelectionProcessDto: CreateSelectionprocessDto,
    createVacancyDto: CreateVacancyDto,
    createRecruiterDto: CreateRecruiterDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ): Promise<{ id: number }> {
    const joboffer = new JobOffer(createJobOfferDto);
    const savedJobOffer = await this.entityManger.save(joboffer);

    //sel process
    const selectionProcess = new SelectionProcess(createSelectionProcessDto);
    selectionProcess.job_offer = savedJobOffer;
    const savedSelectionProcess =
      await this.entityManger.save(selectionProcess);
    //añade al jobofer el sel process
    savedJobOffer.selectionProcess = [savedSelectionProcess];
    await this.entityManger.save(savedJobOffer);

    //vacancy
    const vacancy = new Vacancy(createVacancyDto);
    vacancy.joboffer = savedJobOffer;
    const savedVacancy = await this.entityManger.save(vacancy);
    //añade al jobofer al vacancy
    savedJobOffer.vacancy = [savedVacancy];
    await this.entityManger.save(savedJobOffer);

    //recruiter
    //TODO, nao posso criar recruiter
    const recruiter = new Recruiter(createRecruiterDto, createUtilizadorDto);
    vacancy.joboffer = savedJobOffer;
    const savedRecruiter = await this.entityManger.save(recruiter);
    //añade al jobofer al recruiter
    savedJobOffer.recruiter = savedRecruiter;
    await this.entityManger.save(savedJobOffer);

    if (savedJobOffer) {
      this.myID = savedJobOffer.JO_id;
    }
    return { id: savedJobOffer.JO_id };
  }

  async findAll() {
    return this.jobofferRepo.find();
  }

  async findOne(id: number) {
    return this.jobofferRepo.findOne({
      where: {
        JO_id: id,
      },
    });
  }

  async findDeadlineById(id: number): Promise<Date | null> {
    const jobOffer = await this.jobofferRepo.findOne({
      where: { JO_id: id },
      select: ['deadline'],
    });
    if (jobOffer) {
      return jobOffer.deadline;
    } else {
      return null;
    }
  }

  async update(id: number, updateJobOfferDto: UpdateJobOfferDto) {
    await this.jobofferRepo.update(id, updateJobOfferDto);
    const updatedJobOffer = await this.jobofferRepo.findOne({
      where: { JO_id: id },
    });
    await this.jobofferRepo.find;
    if (!updatedJobOffer) {
      throw new Error('Job offer nao econtrada');
    }
    return updatedJobOffer;
  }

  async remove(id: number) {
    return this.jobofferRepo.delete(id);
  }

  starting_date(): Date {
    const currentDate = new Date();
    return currentDate;
  }

  async startSelectionProcess(joid: number) {
    const deadline = await this.findDeadlineById(joid);
    const starting_date = await this.starting_date();
    if (deadline === starting_date) {
      const candidates = await this.candidateService.findAll();
      for (const candidateItem of candidates) {
        if (await this.verifyCV(candidateItem.User_id)) {
          const candidate = await this.candidateService.findOne(
            candidateItem.User_id,
          );
          await this.processCandidate(candidate);
        } else {
          await this.sendFeedback(candidateItem.User_id, 'invalid_cv');
        }
      }
      await this.finalizeSelection();
    }
  }

  async verifyCV(candidateId: number): Promise<boolean> {
    try {
      const candidate = await this.candidateService.findOne(candidateId);
      const cvBuffer = candidate.cv;
      const keyword = 'javascript';
      const keywordFound = await ResumeParse(cvBuffer, keyword);
      if (keywordFound) {
        this.acceptedCandidateIds.push(candidateId);
      }
      return keywordFound;
    } catch (error) {
      console.error('Error verifying CV:', error);
      return false;
    }
  }

  async processCandidate(candidate: Candidate): Promise<void> {
    try {
      await this.sendFeedback(candidate.User_id, 'next_phase');

      if (this.acceptedCandidateIds.includes(candidate.User_id)) {
        const selectionResult = await this.processSelection(candidate);
        if (selectionResult) {
          await this.sendFeedback(candidate.User_id, 'process_succeed');
        } else {
          await this.sendFeedback(candidate.User_id, 'process_failed');
        }
      }
    } catch (error) {
      console.error('Error processing candidate:', error);
      throw error;
    }
  }

  async sendFeedback(userId: number, feedbackType: string) {
    const user = await this.candidateService.findCandidateEmail(userId);
    const emailTemplate = this.emailService.getEmailTemplate(feedbackType);
    await this.emailService.sendEmail(
      user.email,
      emailTemplate.subject,
      emailTemplate.text,
      emailTemplate.html,
    );
  }

  async processSelection(candidate: any): Promise<boolean> {
    // Implement selection process phases
    // Example: Simulate passing the selection process
    const pass = Math.random() > 0.5;
    return pass;
  }

  async finalizeSelection() {
    const candidates = await this.getBestCandidatesList();
    await this.interviews(candidates);
    await this.selectCandidate(candidates);
  }

  async getBestCandidatesList(): Promise<any[]> {
    // Implement logic to get and sort best candidates
    // Implement logic to get and sort best candidates
    // const candidates = await this.candidateService.findAll();
    // return candidates.sort((a, b) => b.score - a.score).slice(0, 10); // Example sorting logic

    return []; // Placeholder
  }

  async interviews(candidates: Candidate[]) {
    for (const candidate of candidates) {
      const interviewScheduled = await this.scheduleInterview(candidate);
      if (interviewScheduled) {
        await this.sendFeedback(candidate.User_id, 'interview_scheduled');
      } else {
        await this.sendFeedback(candidate.User_id, 'interview_not_scheduled');
      }
    }
  }

  async scheduleInterview(candidate: Candidate): Promise<boolean> {
    // Implement interview scheduling logic
    const canAttend = Math.random() > 0.5; // Example condition
    if (canAttend) {
      // Update candidate status or other relevant information
      // candidate.status = 'interview_scheduled';
      await this.candidateService.update(candidate.User_id, candidate);
    }
    return canAttend;
  }

  async selectCandidate(candidates: any[]) {
    const selectedCandidate = candidates[0];

    await this.sendFeedback(selectedCandidate.User_id, 'congratulations');

    for (const candidate of candidates.slice(1)) {
      await this.sendFeedback(candidate.User_id, 'not_selected');
    }
  }
}
