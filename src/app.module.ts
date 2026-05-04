import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StaticInfoModule } from './features/static-info/static-info.module';
import { CountriesModule } from './features/countries/countries.module';
import { SocialLinksModule } from './features/social-links/social-links.module';
import { UsefulLinksModule } from './features/useful-links/useful-links.module';
import { NewsCategoriesModule } from './features/news-categories/news-categories.module';
import { NewsModule } from './features/news/news.module';
import { RepresentativesModule } from './features/representatives/representatives.module';
import { BranchesModule } from './features/branches/branches.module';
import { EventCategoriesModule } from './features/event-categories/event-categories.module';
import { EventsModule } from './features/events/events.module';
import { TagsModule } from './features/tags/tags.module';
import { InstagramPostsModule } from './features/instagram-posts/instagram-posts.module';
import { FaqsModule } from './features/faqs/faqs.module';
import { QuestionsModule } from './features/questions/questions.module';
import { VacanciesModule } from './features/vacancies/vacancies.module';
import { ApplicationsModule } from './features/applications/applications.module';
import { AuthorsModule } from './features/authors/authors.module';
import { LanguagesModule } from './features/languages/languages.module';
import { BookCategoriesModule } from './features/book-categories/book-categories.module';
import { BooksModule } from './features/books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'wayu_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    CqrsModule,

    StaticInfoModule,
    CountriesModule,
    SocialLinksModule,
    UsefulLinksModule,
    NewsCategoriesModule,
    NewsModule,
    RepresentativesModule,
    BranchesModule,
    EventCategoriesModule,
    EventsModule,
    TagsModule,
    InstagramPostsModule,
    FaqsModule,
    QuestionsModule,
    VacanciesModule,
    ApplicationsModule,
    AuthorsModule,
    LanguagesModule,
    BookCategoriesModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
