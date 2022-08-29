import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from 'src/entities/feedback.entity';
import { Employee } from '../../entities/employee.entity';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Feedback])],
  exports: [TypeOrmModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
