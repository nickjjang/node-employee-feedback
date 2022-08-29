import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from '../../pagination/pagination.service';

import { ObjectLiteral, Repository } from 'typeorm';
import { Employee } from '../../entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService extends PaginationService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.employeesRepository;
  }

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeesRepository.create(data);
    await this.employeesRepository.save(employee);
    return employee;
  }

  findOne(id: number): Promise<Employee> {
    return this.employeesRepository.findOne(id);
  }

  async update(id: number, data: UpdateEmployeeDto) {
    await this.employeesRepository.update({ id }, data);
    return await this.employeesRepository.findOne({ id });
  }

  async remove(id: number) {
    const result = await this.employeesRepository.softDelete(id);
    return result.affected > 0;
  }

  async destroy(id: number) {
    const result = await this.employeesRepository.delete(id);
    return result.affected > 0;
  }
}
