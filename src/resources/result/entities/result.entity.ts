import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Result {
    @PrimaryGeneratedColumn({type: 'int'})
    result_id: number;
    
    @Column({ type: 'char', length: 50 })
    result_desc: string;

    @Column({ type: 'char', length: 255 })
    comments: string;

    @Column({type: 'timestamp'})
    evaluation_date: Date;

}
