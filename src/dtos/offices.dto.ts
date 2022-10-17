import { IsEmail, IsString } from 'class-validator';

export class CreateOfficeDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public officeName: string;
}
