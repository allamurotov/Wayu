import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { News } from '../news/entities/news.entity';
import { Tag } from '../tags/entities/tag.entity';

@Entity('newsTags')
export class NewsTag {
  @PrimaryColumn()
  newsId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => News, (news) => news.newsTags)
  news: News;

  @ManyToOne(() => Tag, (tag) => tag.newsTags)
  tag: Tag;
}
