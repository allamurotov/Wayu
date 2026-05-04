import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateStaticInfoDto {
  @IsOptional()
  @IsString()
  appStoreLink?: string;

  @IsOptional()
  @IsString()
  playMarketLink?: string;

  @IsString()
  @IsNotEmpty()
  aboutUs: string;
}
