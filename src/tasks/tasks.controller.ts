import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { User } from "src/users/entities/user.entity";

@Controller('/tasks')
export class TaskController {

    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @UseGuards(AuthGuard)
    findTasks(){
        return this.tasksService.findTasks();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getTaskById(@Param('id') id: number){
        return this.tasksService.findTasksById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    createTask(@Body() createTaskDto: CreateTaskDto, @Req() request: Request){
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard)
    async deleteTask(@Param('id') id: number){
        return this.tasksService.deleteTask(id);
    }

}