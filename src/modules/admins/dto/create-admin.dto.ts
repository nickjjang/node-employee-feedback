import { ArgumentsHost } from '@nestjs/common';
import { IsNotEmpty, IsString, ValidationArguments } from 'class-validator';
import { Equal, FindOperator, Not } from 'typeorm';
import { Admin } from '../../../entities/admin.entity';
import { Match } from '../../../validations/match.validation';
import { Unique } from '../../../validations/unique.validation';

export class CreateAdminDto {
  id?: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Unique({
    entity: Admin,
    where: (args: ValidationArguments) => {
      const { object } = args;
      const data = object as CreateAdminDto;
      const where = { username: data.username } as {
        username: string;
        id?: FindOperator<number>;
      };
      if (data.id) {
        where.id = Not(Equal(data.id));
      }
      return where;
    },
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Match('password')
  confirmPassword?: string;
}
