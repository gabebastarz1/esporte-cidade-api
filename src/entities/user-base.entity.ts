import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Roles } from "../enums/roles.enum";

@Entity('user-base')
export abstract class UserBase {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ length: 11, unique: false })//cpf deve ser guardado sem formatação
    cpf: string;

    @Column({ nullable: true })
    rg: string;

    @Column()
    birthday: string;

    @Column()
    phone: string

    @Column({ nullable: true })
    photo_url: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @OneToMany(() => Address, (address) => address.user, {
        eager: true,
    })
    addresses: Address[]

    //trocar para enum antes de subir para produção 
    @Column({type: "int", enum: Roles})
    role: Roles;
}