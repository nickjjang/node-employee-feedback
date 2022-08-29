import {
  Query,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Response,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminsService } from './admins.service';
import { Response as Res } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() data: CreateAdminDto) {
    return this.adminsService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.adminsService.paginate(data);
    return res.set({ 'x-total-count': count }).json(list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateAdminDto) {
    return this.adminsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}
