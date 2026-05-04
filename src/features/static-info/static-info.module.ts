import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { StaticInfo } from './entities/static-info.entity';
import { AdminStaticInfoController } from './admin-static-info.controller';
import { PublicStaticInfoController } from './public-static-info.controller';
import { CreateStaticInfoHandler } from './handlers/create-static-info.handler';
import { UpdateStaticInfoHandler } from './handlers/update-static-info.handler';
import { DeleteStaticInfoHandler } from './handlers/delete-static-info.handler';
import { GetStaticInfoHandler } from './handlers/get-static-info.handler';
import { GetStaticInfoByIdHandler } from './handlers/get-static-info-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([StaticInfo]), CqrsModule],
  controllers: [AdminStaticInfoController, PublicStaticInfoController],
  providers: [
    CreateStaticInfoHandler,
    UpdateStaticInfoHandler,
    DeleteStaticInfoHandler,
    GetStaticInfoHandler,
    GetStaticInfoByIdHandler,
  ],
})
export class StaticInfoModule {}
