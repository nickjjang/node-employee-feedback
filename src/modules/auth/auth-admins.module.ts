import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from '../admins/admins.module';
import { JwtStrategy } from './admins-jwt.strategy';
import { AuthAdminsController } from './auth-admins.controller';
import { AuthAdminsService } from './auth-admins.service';

@Module({
  imports: [
    AdminsModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'admin',
      session: false,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('jwt');
      },
    }),
  ],
  providers: [AuthAdminsService, JwtStrategy],
  controllers: [AuthAdminsController],
})
export class AuthAdminsModule {}
