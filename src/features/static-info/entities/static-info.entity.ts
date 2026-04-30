import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('staticInfo')
export class StaticInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  appStoreLink: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  playMarketLink: string;

  @Column({ type: 'text' })
  aboutUs: string;
}
