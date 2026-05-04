import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApplicationStatus } from '../../common/enums/application-status.enum';
import { Vacancy } from '../vacancies/entities/vacancy.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 80 })
  fullName: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 80 })
  email: string;

  @Column()
  vacancyId: number;

  @Column({ type: 'varchar', length: 200 })
  resumeFile: string;

  @Column({ type: 'text', nullable: true })
  coverLetter: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.ACTIVE,
  })
  status: ApplicationStatus;

  @Column({ type: 'date' })
  appliedDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  portfolio: string;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications)
  vacancy: Vacancy;
}
