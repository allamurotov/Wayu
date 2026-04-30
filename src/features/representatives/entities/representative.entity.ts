import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Branch } from '../branches/entities/branch.entity';

@Entity('representatives')
export class Representative {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  fullName: string;

  @Column({ type: 'varchar', length: 128 })
  image: string;

  @Column({ type: 'varchar', length: 64 })
  email: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ type: 'text' })
  resume: string;

  @OneToMany(() => Branch, (branch) => branch.representative)
  branches: Branch[];
}
