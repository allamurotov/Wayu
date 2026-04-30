import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StaticInfoModule } from './features/static-info/static-info.module';
import { CountriesModule } from './features/countries/countries.module';
import { SocialLinksModule } from './features/social-links/social-links.module';
import { UsefulLinksModule } from './features/useful-links/useful-links.module';
import { NewsCategoriesModule } from './features/news-categories/news-categories.module';
import { NewsModule } from './features/news/news.module';
import { NewsTagsModule } from './features/news-tags/news-tags.module';
import { RepresentativesModule } from './features/representatives/representatives.module';
import { BranchesModule } from './features/branches/branches.module';
import { EventCategoriesModule } from './features/event-categories/event-categories.module';
import { EventsModule } from './features/events/events.module';
import { TagsModule } from './features/tags/tags.module';
import { InstagramPostsModule } from './features/instagram-posts/instagram-posts.module';
import { FaqsModule } from './features/faqs/faqs.module';
import { FaqTagsModule } from './features/faq-tags/faq-tags.module';
import { QuestionsModule } from './features/questions/questions.module';
import { VacanciesModule } from './features/vacancies/vacancies.module';
import { ApplicationsModule } from './features/applications/applications.module';
import { AuthorsModule } from './features/authors/authors.module';
import { LanguagesModule } from './features/languages/languages.module';
import { BookCategoriesModule } from './features/book-categories/book-categories.module';
import { BooksModule } from './features/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST') || 'localhost',
        port: configService.get('DB_PORT') || 5432,
        username: configService.get('DB_USERNAME') || 'postgres',
        password: configService.get('DB_PASSWORD') || 'password',
        database: configService.get('DB_DATABASE') || 'wayu_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // IMPORTANT: DO NOT use synchronize: true
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    StaticInfoModule,
    CountriesModule,
    SocialLinksModule,
    UsefulLinksModule,
    NewsCategoriesModule,
    NewsModule,
    NewsTagsModule,
    RepresentativesModule,
    BranchesModule,
    EventCategoriesModule,
    EventsModule,
    TagsModule,
    InstagramPostsModule,
    FaqsModule,
    FaqTagsModule,
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
