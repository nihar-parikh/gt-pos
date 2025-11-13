import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTask } from './sub-tasks.entity';
import { SubTaskResolver } from './sub-tasks.resolver';
import { SubTaskService } from './sub-tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubTask])],
  providers: [SubTaskService, SubTaskResolver],
})
export class SubTasksModule {}
