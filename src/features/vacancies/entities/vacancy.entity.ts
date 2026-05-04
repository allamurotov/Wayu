import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VacancyType } from '../../common/enums/vacancy-type.enum';
import { Application } from '../applications/entities/application.entity';

@Entity('vacancies')
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 150 })
  location: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 20 })
  contact: string;

  @Column({
    type: 'enum',
    enum: VacancyType,
  })
  type: VacancyType;

  @Column({ type: 'varchar', length: 100 })
  salaryRange: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ type: 'int', default: 0 })
  applicantCount: number;

  @OneToMany(() => Application, (application) => application.vacancy)
  applications: Application[];
}
