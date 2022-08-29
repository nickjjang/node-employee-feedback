import { Body, Controller, Get, Param, Put, Response } from '@nestjs/common';

import { Response as Res } from 'express';
import { UpdateFeedbackDto } from '../feedbacks/dto/update-feedback.dto';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Put('/feedbacks/:feedbackId')
  updateFeedback(
    @Param('feedbackId') feedbackId: string,
    @Body() data: UpdateFeedbackDto,
  ) {
    return this.homeService.updateFeedback(+feedbackId, data);
  }

  @Get('employees')
  async employees(@Response() res: Res) {
    const list = await this.homeService.getEmployees();
    return res.json(list);
  }

  @Get('employees/:giverId/feedbacks')
  async getFeedbacks(@Response() res: Res, @Param('giverId') giverId: string) {
    const list = await this.homeService.getFeedbacks(+giverId);
    return res.json(list);
  }
}
