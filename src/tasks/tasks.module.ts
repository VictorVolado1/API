import { Module } from "@nestjs/common";
import { TaskController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Task])
    ],
    controllers: [TaskController],
    providers: [TasksService]
})

export class TaskModule {}