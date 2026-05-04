import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VacancyType } from '../../../common/enums/vacancy-type.enum';
import { Application } from '../../applications/entities/application.entity';

@Entity('vacancies')
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'varchar', length: 128 })
  address: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: VacancyType,
  })
  type: VacancyType;

  @Column({ type: 'varchar', length: 64 })
  salary: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Application, (application) => application.vacancy)
  applications: Application[];
}
