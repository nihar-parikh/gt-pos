import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/resources/auth/casl/casl.module';
import { TaskResolver } from './tasks.resolver';
import { Task } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CaslModule],
  providers: [TaskService, TaskResolver,TasksRepository],
  exports: [TypeOrmModule],
})
export class TasksModule {}
