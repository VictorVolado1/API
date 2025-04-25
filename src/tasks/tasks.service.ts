import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TasksService{

    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>){}

    findTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async findTasksById(id: number): Promise<Task> {

        const task = await this.tasksRepository.findOne({
            where: {id}
        });
        
        if(!task) throw new NotFoundException;

        return task;
    }

    createTask(createTaskdto: CreateTaskDto): Promise<Task> {
        const task = this.tasksRepository.create(createTaskdto)
        return this.tasksRepository.save(task);
    }

    async deleteTask(id: number): Promise<void>{
        
        const result = await this.tasksRepository.delete(id);

        if(result.affected === 0) throw new NotFoundException;

    }

}