import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    name: string;

    @Column({length: 100})
    description: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @Column({default: false})
    completed: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'id_user' })
    user: User;
    
}