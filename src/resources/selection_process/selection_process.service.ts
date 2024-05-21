import { Injectable } from '@nestjs/common';
import { CreateSelectionprocessDto } from './dto/create-selection_process.dto';
import { UpdateSelectionprocessDto } from './dto/update-selection_process.dto';
//import { SelectionProcess } from './entities/selection_process.entity';
//import { SelectionPhase } from '../selection_phase/entities/selection_phase.entity';
import { SelectionPhaseService } from 'src/resources/selection_phase/selection_phase.service';
import { EmailService } from 'src/services/email.service';
import { CandidateService } from '../candidate/candidate.service';
import { ResumeParse } from '../../cv_validation/resume_parse';
import * as fs from 'fs';
import { Candidate } from '../candidate/entities/candidate.entity';
import { JobOfferService } from '../job_offer/job_offer.service';

@Injectable()
export class SelectionProcessService {
  constructor(
    private readonly selectionPhaseService: SelectionPhaseService,
    private readonly candidateService: CandidateService,
    // private readonly emailService: EmailService,
    private readonly selectionProcess: SelectionPhaseService,
    // private readonly jobofferService: JobOfferService,
  ) {}
  private acceptedCandidateIds: number[] = [];

  async create(createSelectionprocessDto: CreateSelectionprocessDto) {
    const newSelectionProcess = await this.selectionPhaseService.create(
      createSelectionprocessDto.selectionPhase,
    );
    return 'This action adds a new candidacy and selection process';
  }

  async findAll() {
    return await this.selectionProcess.findAll();
  }

  findOne(id: number) {
    return this.selectionProcess.findOne(id);
  }

  update(id: number, updateSelectionprocessDto: UpdateSelectionprocessDto) {
    return `This action updates a #${id} Selectionprocess`;
  }

  // remove(id: number) {
  //   return this.selectionProcess.remove(id);
  // }

  async startSelectionProcess() {
    const candidates = await this.candidateService.findAll();

    for (const candidateItem of candidates) {
      if (await this.verifyCV(candidateItem.User_id)) {
        const candidate = await this.candidateService.findOne(
          candidateItem.User_id,
        );
        await this.processCandidate(candidate);
      } else {
        await this.sendFeedback(candidateItem.email, 'invalid_cv');
      }
    }

    await this.finalizeSelection();
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
      await this.sendFeedback(candidate.email, 'next_phase');

      if (this.acceptedCandidateIds.includes(candidate.User_id)) {
        const selectionResult = await this.processSelection(candidate);
        if (selectionResult) {
          await this.sendFeedback(candidate.email, 'process_succeed');
        } else {
          await this.sendFeedback(candidate.email, 'process_failed');
        }
      }
    } catch (error) {
      console.error('Error processing candidate:', error);
      throw error;
    }
  }

  async sendFeedback(email: string, feedbackType: string) {
    // Implement email sending logic based on feedbackType
    // await this.emailService.sendEmail(email, feedbackType);
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
        await this.sendFeedback(candidate.email, 'interview_scheduled');
      } else {
        await this.sendFeedback(candidate.email, 'interview_not_scheduled');
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

    await this.sendFeedback(selectedCandidate.email, 'congratulations');

    for (const candidate of candidates.slice(1)) {
      await this.sendFeedback(candidate.email, 'not_selected');
    }
  }
}
