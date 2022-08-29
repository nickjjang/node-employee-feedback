/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/entities/admin.entity';
import { AdminsService } from '../admins/admins.service';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';

export interface JwtPayload {
  username: string;
}

@Injectable()
export class AuthAdminsService {
  constructor(private adminsService: AdminsService) {}
  async validateUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<Admin> {
    const user = await this.adminsService.findOneByUsername(username);
    if (!user) {
      return null;
    }
    const { password: hash } = user;
    console.log(hash);
    if (bcrypt.compare(password, hash)) {
      return user;
    }
    return null;
  }

  validateUsername(username: string): Promise<Admin> {
    return this.adminsService.findOneByUsername(username);
  }

  create(data: CreateAdminDto): Promise<Admin> {
    return this.adminsService.create(data);
  }
}
