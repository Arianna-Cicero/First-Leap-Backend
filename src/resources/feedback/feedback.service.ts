import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    return await this.feedbackRepository.save(createFeedbackDto);
  }
  
  async findAll(): Promise<Feedback[]> {
    return await this.feedbackRepository.find();
  }

  async findOne(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({ where: { feedback_id: id } });
    if (!feedback) {
      throw new Error(`Feedback with id ${id} not found`);
    }
    return feedback;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto): Promise<Feedback> {
    await this.feedbackRepository.update(id, updateFeedbackDto);
    const updatedFeedback = await this.feedbackRepository.findOne({ where: { feedback_id: id } });
    if (!updatedFeedback) {
      throw new Error('Feedback not found');
    }
    return updatedFeedback;
  }

  async remove(id: number): Promise<void> {
    const result = await this.feedbackRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Feedback with id ${id} not found`);
    }
  }
}
