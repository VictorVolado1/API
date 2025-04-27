import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { UserActive } from "src/common/decorators/user.decorator";
import { ActiveUserInterface } from "src/common/interfaces/active-user.interface";

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
    async createTask(@Body() createTaskDto: CreateTaskDto, @UserActive() user: ActiveUserInterface){
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard)
    async deleteTask(@Param('id') id: number){
        return this.tasksService.deleteTask(id);
    }

}