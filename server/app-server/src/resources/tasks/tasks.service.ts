import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TaskService {
  constructor(
    private taskRepository: TasksRepository
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.readAllTasks();
  }

  async findOne(id: number): Promise<Task | null> {
    return this.taskRepository.readTask(id);
  }

  async create(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = this.taskRepository.createTask(createTaskInput);
    return task;
  }

  async update(updateTaskInput: UpdateTaskInput): Promise<Task | null> {
    const { id, ...rest } = updateTaskInput;
    const task = await this.taskRepository.readTask(id);
    if (!task) return null;
    Object.assign(task, rest);
    return this.taskRepository.updateTask(task);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.taskRepository.deleteTask(id);
    return result;
  }
}
