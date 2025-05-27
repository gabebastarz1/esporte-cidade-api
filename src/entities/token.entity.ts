import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { UserBase } from "./user-base.entity"

@Entity("token")
export class Token {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    token: string
    
    @ManyToOne(() => UserBase, (user) => user.tokens)
    userBase: UserBase

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string
}