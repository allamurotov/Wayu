import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Vacancy } from './entities/vacancy.entity';
import { AdminVacanciesController } from './admin-vacancies.controller';
import { PublicVacanciesController } from './public-vacancies.controller';
import { CreateVacancyHandler } from './handlers/create-vacancy.handler';
import { UpdateVacancyHandler } from './handlers/update-vacancy.handler';
import { DeleteVacancyHandler } from './handlers/delete-vacancy.handler';
import { GetVacanciesHandler } from './handlers/get-vacancies.handler';
import { GetVacancyByIdHandler } from './handlers/get-vacancy-by-id.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Vacancy]), CqrsModule],
  controllers: [AdminVacanciesController, PublicVacanciesController],
  providers: [
    CreateVacancyHandler,
    UpdateVacancyHandler,
    DeleteVacancyHandler,
    GetVacanciesHandler,
    GetVacancyByIdHandler,
  ],
})
export class VacanciesModule {}
