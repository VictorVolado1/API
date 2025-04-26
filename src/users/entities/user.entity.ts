import { Exclude } from "class-transformer";
import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false ,length: 100})
    name: string;

    @Column({unique: true, nullable: false ,length: 100})
    email: string;

    @Column({nullable: false ,length: 100})
    password: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
    
    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

}