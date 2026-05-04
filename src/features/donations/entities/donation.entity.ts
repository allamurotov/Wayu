import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  fullName: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 64 })
  email: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 50 })
  paymentProvider: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'text', nullable: true })
  message: string;
}
