import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator';
export class CreateEmployeeDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}
