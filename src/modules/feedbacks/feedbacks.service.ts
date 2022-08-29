import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Feedback } from '../../entities/feedback.entity';
import { PaginationService } from '../../pagination/pagination.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbacksService extends PaginationService {
  constructor(
    @InjectRepository(Feedback)
    private repository: Repository<Feedback>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateFeedbackDto): Promise<Feedback> {
    const event = this.repository.create(data);
    await this.repository.save(event);
    return event;
  }

  findOne(id: number): Promise<Feedback> {
    return this.repository.findOne(id, {
      relations: ['giver', 'receiver'],
    });
  }

  async update(id: number, dto: UpdateFeedbackDto) {
    await this.repository.update({ id }, dto);
    return await this.repository.findOne({ id });
  }

  async remove(id: number) {
    const result = await this.repository.softDelete(id);
    return result.affected > 0;
  }

  async destroy(id: number) {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
