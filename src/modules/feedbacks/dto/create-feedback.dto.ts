import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  reviewId: number;

  @IsNumber()
  giverId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  content: string;

  @IsBoolean()
  completed?: boolean;
}
