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
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
@UseGuards(new AuthAdminGuard())
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  create(@Body() data: CreateFeedbackDto) {
    return this.feedbacksService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.feedbacksService.paginate(data);
    return res.set({ 'x-total-count': count }).json(list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateFeedbackDto) {
    return this.feedbacksService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbacksService.remove(+id);
  }
}
