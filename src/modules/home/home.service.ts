import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Feedback } from 'src/entities/feedback.entity';
import { Repository } from 'typeorm';
import { Employee } from '../../entities/employee.entity';
import { UpdateFeedbackDto } from '../feedbacks/dto/update-feedback.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,

    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
  ) {}

  async updateFeedback(id: number, data: UpdateFeedbackDto) {
    data.completed = true;
    await this.feedbackRepository.update({ id }, data);
    return await this.feedbackRepository.findOne({ id });
  }

  async getEmployees() {
    return await this.employeesRepository.find();
  }

  async getFeedbacks(giverId: number) {
    return await this.feedbackRepository.find({
      where: {
        completed: false,
        giverId: giverId,
      },
      relations: ['review', 'giver', 'receiver'],
    });
  }
}
