import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('material')
export class Material{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'int'})
    quantity: number;

}