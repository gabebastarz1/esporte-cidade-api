import { CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Modality } from "./modality.entity";
import { Athlete } from "./athlete.entity";

@Entity('atendiment')
export class Atendiment{
    
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Modality,{onDelete: "SET NULL"})
    modality: Modality;

    @ManyToMany(() => Athlete, (athlete) => athlete.atendiments, )
    athletes: Athlete[];
}