import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Application } from './entities/application.entity';
import { AdminApplicationsController } from './admin-applications.controller';
import { PublicApplicationsController } from './public-applications.controller';
import { CreateApplicationHandler } from './handlers/create-application.handler';
import { UpdateApplicationHandler } from './handlers/update-application.handler';
import { DeleteApplicationHandler } from './handlers/delete-application.handler';
import { GetApplicationsHandler } from './handlers/get-applications.handler';
import { GetApplicationByIdHandler } from './handlers/get-application-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), CqrsModule],
  controllers: [AdminApplicationsController, PublicApplicationsController],
  providers: [
    CreateApplicationHandler,
    UpdateApplicationHandler,
    DeleteApplicationHandler,
    GetApplicationsHandler,
    GetApplicationByIdHandler,
  ],
})
export class ApplicationsModule {}
