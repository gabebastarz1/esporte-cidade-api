import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('material')
export class Material {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({ default: "Sem descrição", nullable: true })
    description: string;

    @Column({ type: 'int', default: 0 })
    quantity: number;

}