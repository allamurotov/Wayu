import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('socialLinks')
export class SocialLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  title: string;

  @Column({ type: 'varchar', length: 128 })
  icon: string;

  @Column({ type: 'varchar', length: 128 })
  link: string;
}
