import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('documentation')
export class Documentation {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    //trocar para timestamp antes de subir para produção
    @CreateDateColumn({type:"date", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;
    
    @UpdateDateColumn({type:"date", default: () => "CURRENT_TIMESTAMP", onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}