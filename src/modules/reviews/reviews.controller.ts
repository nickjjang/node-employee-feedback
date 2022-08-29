import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { AuthAdminGuard } from '../auth/auth-admins.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
@UseGuards(new AuthAdminGuard())
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() data: CreateReviewDto) {
    return this.reviewsService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.reviewsService.paginate(data);
    return res.set({ 'x-total-count': count }).json(list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateReviewDto) {
    return this.reviewsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
