import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './tasks.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private taskModel: Repository<Task>,
  ) {}

  //SAMPLE:: Listen to the event emitted from SubTaskService
  @OnEvent('tasks.read_all_subtasks') // Listen to the event emitted from SubTaskService
  //SAMPLE END
  async readAllTasks(): Promise<Task[]> {
    console.log('Event received: tasks.read_all_subtasks');
    return this.taskModel.find({ relations: ['subTasks'] });
  }

  async readTask(id: number): Promise<Task | null> {
    return this.taskModel.findOne({
      where: { id },
      relations: ['subTasks'],
    });
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = this.taskModel.create(createTaskInput);
    return this.taskModel.save(task);
  }

  async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task | null> {
    const { id, ...rest } = updateTaskInput;
    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) return null;
    Object.assign(task, rest);
    return this.taskModel.save(task);
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskModel.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
