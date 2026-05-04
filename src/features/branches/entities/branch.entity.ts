import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from '../../countries/entities/country.entity';
import { Representative } from '../../representatives/entities/representative.entity';

@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  countryId: number;

  @Column()
  representativeId: number;

  @Column({ type: 'varchar', length: 64 })
  city: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber: string;

  @ManyToOne(() => Country, (country) => country.branches)
  country: Country;

  @ManyToOne(() => Representative, (representative) => representative.branches)
  representative: Representative;
}
