import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserBase extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    password: string;

    @Column({length: 11, unique: true})
    cpf: string;

    @Column()
    birthday: string;

    @Column()
    phone: string

    @Column({nullable: true})
    photoUrl: string;

    @Column({unique: true})
    email: string;
}