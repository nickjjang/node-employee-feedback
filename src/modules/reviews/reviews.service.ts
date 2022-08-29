import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { Review } from '../../entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService extends PaginationService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.reviewsRepository;
  }

  async create(data: CreateReviewDto): Promise<Review> {
    const scope = this.reviewsRepository.create(data);
    await this.reviewsRepository.save(scope);
    return scope;
  }

  findOne(id: number): Promise<Review> {
    return this.reviewsRepository.findOne(id, {
      relations: ['feedbacks'],
    });
  }

  async update(id: number, data: UpdateReviewDto) {
    await this.reviewsRepository.update({ id }, data);
    return await this.reviewsRepository.findOne(id);
  }

  async remove(id: number) {
    const result = await this.reviewsRepository.softDelete(id);
    return result.affected > 0;
  }

  async destroy(id: number) {
    const result = await this.reviewsRepository.delete(id);
    return result.affected > 0;
  }
}
