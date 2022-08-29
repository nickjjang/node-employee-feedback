import { IsNotEmpty, IsString } from 'class-validator';
export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  content?: string;
}
