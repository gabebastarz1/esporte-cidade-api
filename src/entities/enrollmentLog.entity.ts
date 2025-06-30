import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { Athlete } from './athlete.entity';
import { UserBase } from './user-base.entity';

@Entity('enrollment_logs')
export class EnrollmentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Enrollment, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;

  @Column()
  enrollment_id: number;

  @ManyToOne(() => Athlete, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'athlete_id' })
  athlete: Athlete;

  @Column()
  athlete_id: number;

  @Column({ type: 'varchar', length: 50 })
  event_type: string; // 'approved', 'deactivated', etc.

  @Column({ type: 'text', nullable: true })
  event_description: string;

  @CreateDateColumn({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: 'int', nullable: true })
  changed_by: number; // user/admin id

  @Column({ type: 'json', nullable: true })
  old_value: any;

  @Column({ type: 'json', nullable: true })
  new_value: any;
}
