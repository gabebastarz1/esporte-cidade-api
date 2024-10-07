import { Column, Entity, ManyToMany } from "typeorm";
import { UserBase } from "./user-base.entity";
import { Atendiment } from "./atendiment.entity";
import { Modality } from "./modality.entity";

@Entity('athlete')
export class Athlete extends UserBase {
    @Column({ nullable: true, default: "Nenhum nome informado" })
    father_name: string;

    @Column({ nullable: true })
    father_phone: string;

    @Column({ nullable: true })
    father_cpf: string;

    @Column({ nullable: true })
    father_email: string;

    @Column({ nullable: true, default: "Nenhum nome informado" })
    mother_name: string;

    @Column({ nullable: true })
    mother_phone: string;

    @Column({ nullable: true })
    mother_cpf: string;

    @Column({ nullable: true })
    mother_email: string;

    @Column({ nullable: true, default: "Nenhum responsável informado" })
    responsible_person_name: string;

    @Column({ nullable: true })
    responsible_person_email: string;

    @Column({ nullable: true })
    responsible_person_cpf: string;

    @Column({ nullable: true, default: "Nenhum tipo sanguíneo informado" })
    blood_type: string;

    @Column({ nullable: true })
    photo_url_cpf_front: string;

    @Column({ nullable: true })
    photo_url_cpf_back: string;

    @Column({ nullable: true, default: "Nenhuma alergia informada" })
    allergy: string;

    @ManyToMany(() => Atendiment, (atendiment) => atendiment.athletes, {})
    atendiments: Atendiment[];

    @ManyToMany(() => Modality, (modality) => modality.registred_athletes)
    modalities: Modality[]
}

