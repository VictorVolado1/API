import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";

@Controller('/tasks')
export class TaskController {

    constructor(private readonly tasksService: TasksService) {}

    @Get()
    @UseGuards(AuthGuard)
    findTasks(){
        return this.tasksService.findTasks();
    }

    @Get(':id')
    getTaskById(@Param('id') id: number){
        return this.tasksService.findTasksById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto){
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteTask(@Param('id') id: number){
        return this.tasksService.deleteTask(id);
    }

}