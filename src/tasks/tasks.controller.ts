import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { AuthGuard } from "src/auth-security/guard/auth.guard";
import { UserActive } from "src/common/decorators/user.decorator";
import { ActiveUserInterface } from "src/common/interfaces/active-user.interface";
import { UpdateTaskdto } from "./dto/update-task.dto";

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

    @Patch(':id')
    @UseGuards(AuthGuard)
    async updateTask(@Param('id') id: number, @Body() updateTaskdto: UpdateTaskdto, @UserActive() user: ActiveUserInterface){
        return this.tasksService.updateTask(id, updateTaskdto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteTask(@Param('id') id: number){
        return this.tasksService.deleteTask(id);
    }

}