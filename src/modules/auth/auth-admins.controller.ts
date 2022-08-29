import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { AuthAdminsService } from './auth-admins.service';
import { AuthAdminDto } from './dto/auth-admin.dto';

@Controller('auth-admins')
export class AuthAdminsController {
  constructor(
    private readonly authAdminsService: AuthAdminsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() data: CreateAdminDto) {
    const user = await this.authAdminsService.create(data);
    if (user) {
      return this.signin(data);
    }
  }

  @Post('signin')
  async signin(@Body() data: AuthAdminDto) {
    const user = await this.authAdminsService.validateUsernameAndPassword(
      data.username,
      data.password,
    );
    if (!user) {
      throw new HttpException(
        'Username or password is invalid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const { password, ...userData } = user;
    const token = this.jwtService.sign(userData);
    return {
      token,
      user: userData,
    };
  }
}
