import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entity';
import { PaginationService } from '../../pagination/pagination.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService extends PaginationService {
  constructor(
    @InjectRepository(Admin)
    private repository: Repository<Admin>,
  ) {
    super();
  }

  getRepository(): Repository<ObjectLiteral> {
    return this.repository;
  }

  async create(data: CreateAdminDto): Promise<Admin> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const adminData = this.repository.create(data);
    const admin = await this.repository.save(adminData);
    return admin;
  }

  findOne(id: number): Promise<Admin> {
    return this.repository.findOne(id);
  }

  findOneByUsername(username: string): Promise<Admin> {
    return this.repository.findOne({
      username,
    });
  }

  async update(id: number, data: UpdateAdminDto): Promise<Admin> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await this.repository.update(id, data);
    return await this.findOne(id);
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
