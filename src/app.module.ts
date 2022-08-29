import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AdminsModule } from './modules/admins/admins.module';
import { AuthAdminsModule } from './modules/auth/auth-admins.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { FeedbacksModule } from './modules/feedbacks/feedbacks.module';
import { HomeModule } from './modules/home/home.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database');
      },
      connectionFactory: async (options) => {
        const connection = await createConnection(options);
        return connection;
      },
    }),
    AdminsModule,
    AuthAdminsModule,
    EmployeesModule,
    ReviewsModule,
    FeedbacksModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
