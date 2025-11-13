import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../tasks/tasks.entity';
import { SubTask } from './sub-tasks.entity';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTask)
    private subTaskRepository: Repository<SubTask>,
    private eventEmitter: EventEmitter2 //Inject EventEmitter2 instance for using event emitter
  ) {}

  async findAll(): Promise<SubTask[]> {
    // SAMPLE:: Emit an event to notify that all subtasks are being read
    this.eventEmitter.emit(
      'tasks.read_all_subtasks',
    );
    return this.subTaskRepository.find({ relations: ['task'] });
  }

  async findOne(id: number): Promise<SubTask | null> {
    return this.subTaskRepository.findOne({ where: { id }, relations: ['task'] });
  }

  async create(description: string, task: Task): Promise<SubTask> {
    const subTask = this.subTaskRepository.create({ description, task });
    return this.subTaskRepository.save(subTask);
  }

  async update(id: number, description: string): Promise<SubTask | null> {
    const subTask = await this.subTaskRepository.findOne({ where: { id } });
    if (!subTask) return null;
    subTask.description = description;
    return this.subTaskRepository.save(subTask);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.subTaskRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
