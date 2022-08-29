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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

import { Response as Res } from 'express';
import { PaginationDto } from '../../pagination/pagination.dto';
import { AuthAdminGuard } from '../auth/auth-admins.guard';

@Controller('employees')
@UseGuards(new AuthAdminGuard())
export class EmployeesController {
  constructor(private readonly usersService: EmployeesService) {}

  @Post()
  create(@Body() data: CreateEmployeeDto) {
    return this.usersService.create(data);
  }

  @Get()
  async find(@Response() res: Res, @Query() data: PaginationDto) {
    const [list, count] = await this.usersService.paginate(data);
    return res.set({ 'x-total-count': count }).json(list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateEmployeeDto) {
    return this.usersService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
