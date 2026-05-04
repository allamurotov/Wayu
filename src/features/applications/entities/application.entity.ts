import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApplicationStatus } from '../../../common/enums/application-status.enum';
import { Vacancy } from '../../vacancies/entities/vacancy.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  fullName: string;

  @Column({ type: 'varchar', length: 16 })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 64 })
  email: string;

  @Column()
  vacancyId: number;

  @Column({ type: 'varchar', length: 128 })
  resume: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.ACTIVE,
  })
  status: ApplicationStatus;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications)
  vacancy: Vacancy;
}
