import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Athlete } from "./athlete.entity";
import { Modality } from "./modality.entity";

@Entity("enrollment")
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "boolean", default: false })
  active: boolean;

  @Column({ type: "boolean", default: false })
  approved: boolean;

  @CreateDateColumn({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => Athlete)
  athlete: Athlete;

  @ManyToOne(() => Modality)
  modality: Modality;
}
