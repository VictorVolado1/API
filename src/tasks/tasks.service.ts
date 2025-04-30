import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository, Between } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { ActiveUserInterface } from "src/common/interfaces/active-user.interface";
import { UpdateTaskdto } from "./dto/update-task.dto";
import { ExportTasksdto } from "./dto/export-tasks.dto";
import * as XLSX from 'xlsx';
import * as moment from 'moment';

@Injectable()
export class TasksService{

    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>){}

    findTasks(user: ActiveUserInterface): Promise<Task[]> {
        return this.tasksRepository.find({
            where: {user: {id: user.sub}}
        });
    }

    async findTasksById(id: number): Promise<Task> {

        const task = await this.tasksRepository.findOne({
            where: {id}
        });
        
        if(!task) throw new NotFoundException;

        return task;
    }

    async createTask(createTaskdto: CreateTaskDto, user: ActiveUserInterface): Promise<Task> {
        const task = this.tasksRepository.create({
            ...createTaskdto,
            user: { id: user.sub }
        })
        return this.tasksRepository.save(task);
    }

    async deleteTask(id: number): Promise<void>{
        
        const result = await this.tasksRepository.delete(id);

        if(result.affected === 0) throw new NotFoundException;

    }

    async updateTask(id: number, updateTaskdto: UpdateTaskdto, user: ActiveUserInterface): Promise<Task> {

        const task = await this.tasksRepository.findOne({
            where: {id: id, user: {id: user.sub}}
        });

        if(!task) throw new NotFoundException;

        task.completed = updateTaskdto.completed;

        return this.tasksRepository.save(task);

    }

    async exportTasks(exportTasksdto: ExportTasksdto, user: ActiveUserInterface): Promise<Buffer> {
       
        const { completed, createdAt, updatedAt } = exportTasksdto;

        const where: any = {
            user: { id: user.sub },
        };
      
        if ((completed !== null && completed !== undefined) && completed !== true) {
            where.completed = completed;
        }
        if (createdAt?.from && createdAt?.to) {
            where.createdAt = Between(
              moment(createdAt.from).startOf('day').toDate(),
              moment(createdAt.to).endOf('day').toDate(),
            );
          }
      
        if (updatedAt?.from && updatedAt?.to) {
            where.updatedAt = Between(
              moment(updatedAt.from).startOf('day').toDate(),
              moment(updatedAt.to).endOf('day').toDate(),
            );
        }

        const tasks = await this.tasksRepository.find({
            where,
        });

        const data = tasks.map((task) => {

            let duration = '';
            if (task.completed) {
                const inicio = moment(task.createdAt);
                const fin = moment(task.updatedAt);
                const diff = moment.duration(fin.diff(inicio));
                
                const days = Math.floor(diff.asDays());
                const hours = diff.hours();
                const minutes = diff.minutes();
                
                duration = [
                    days > 0 ? `${days}d` : '',
                    hours > 0 ? `${hours}h` : '',
                    minutes > 0 ? `${minutes}m` : ''
                ].filter(Boolean).join(' ') || '0m';
            }
    
            return {
                id: task.id,
                Nombre: task.name,
                Descripción: task.description,
                Estado: task.completed ? 'Finalizada' : 'Pendiente',
                'Fecha Creacion': moment(task.createdAt).format('YYYY-MM-DD HH:mm'),
                'Fecha Ultima Actualizacion': task.completed ? moment(task.updatedAt).format('YYYY-MM-DD HH:mm') : 'Aun Pendiente',
                'Duración': duration
            };
        });
    
        const worksheet = XLSX.utils.json_to_sheet(data);
        
        worksheet['!cols'] = [
            { width: 8 },
            { width: 20 },
            { width: 40 },
            { width: 12 },
            { width: 16 },
            { width: 16 },
            { width: 15 }
        ];
    
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
        
        const buffer = XLSX.write(workbook, {
            type: 'buffer',
            bookType: 'xlsx',
        });

        return buffer;

    }

}