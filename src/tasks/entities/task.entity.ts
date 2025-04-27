import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    description: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({default: false})
    completed: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'id_user' })
    user: User;
    
}