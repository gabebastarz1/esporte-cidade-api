import { Priority } from "../enums/priority.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('release')
export class Release {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    //trocar para enum quando subir para produção
    @Column({ type: "text", enum: Priority, default: Priority.LOW })
    priority: Priority;

    //trocar o type para timestamp quando subir para produção 
    @CreateDateColumn({type:"date", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

}

