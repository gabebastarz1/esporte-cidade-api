import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserBase } from "./user-base.entity";

@Entity('address')
export class Address{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    state: string;

    @Column()
    city: string;

    @Column()
    neighborhood: string;

    @Column()
    street: string;

    @Column()
    number: number;

    @Column()
    complement: string;

    @Column()
    references: string;

    @ManyToOne(() => UserBase, {onDelete: "CASCADE"})
    user: UserBase
}