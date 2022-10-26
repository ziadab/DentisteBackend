import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePation {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  public cin: string;

  @IsNumber()
  @IsNotEmpty()
  public age: number;

  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public profession: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public cardiovasculaires: string;

  @IsString()
  @IsNotEmpty()
  public hematologiques: string;

  @IsString()
  @IsNotEmpty()
  public endocriniennes: string;

  @IsString()
  @IsNotEmpty()
  public allergies: string;

  @IsString()
  @IsNotEmpty()
  public nerveux: string;

  @IsString()
  @IsOptional()
  public autre: string;
}
