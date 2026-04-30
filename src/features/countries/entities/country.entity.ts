import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { News } from '../news/entities/news.entity';
import { Branch } from '../branches/entities/branch.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64, unique: true })
  @Index()
  title: string;

  @Column({ type: 'varchar', length: 128 })
  flag: string;

  @OneToMany(() => News, (news) => news.country)
  news: News[];

  @OneToMany(() => Branch, (branch) => branch.country)
  branches: Branch[];
}
