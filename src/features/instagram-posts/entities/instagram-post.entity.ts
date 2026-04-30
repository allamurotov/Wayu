import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('instagramPosts')
export class InstagramPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  image: string;

  @Column({ type: 'varchar', length: 128 })
  link: string;
}
