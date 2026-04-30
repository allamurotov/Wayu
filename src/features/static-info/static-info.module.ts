import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticInfoService } from './static-info.service';
import { StaticInfoController } from './static-info.controller';
import { StaticInfo } from './entities/static-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaticInfo])],
  controllers: [StaticInfoController],
  providers: [StaticInfoService],
  exports: [StaticInfoService],
})
export class StaticInfoModule {}
