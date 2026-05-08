import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum PaymentProvider {
  PAYME = 'payme',
  CLICK = 'click',
  OSON = 'oson',
}

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 64 })
  fullName: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'enum', enum: PaymentProvider })
  paidBy: PaymentProvider;
}
