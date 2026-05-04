import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateNewsDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  countryId?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
