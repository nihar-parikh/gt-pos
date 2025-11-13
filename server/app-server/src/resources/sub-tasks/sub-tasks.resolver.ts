import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from '../tasks/tasks.entity';
import { SubTask } from './sub-tasks.entity';
import { SubTaskService } from './sub-tasks.service';

@Resolver(() => SubTask)
export class SubTaskResolver {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Query(() => [SubTask])
  async subTasks() {
    return this.subTaskService.findAll();
  }

  @Query(() => SubTask, { nullable: true })
  async subTask(@Args('id', { type: () => Int }) id: number) {
    return this.subTaskService.findOne(id);
  }

  @Mutation(() => SubTask)
  async createSubTask(
    @Args('description') description: string,
    @Args('taskId', { type: () => Int }) taskId: number,
  ) {
    const task = { id: taskId } as Task;
    return this.subTaskService.create(description, task);
  }

  @Mutation(() => SubTask, { nullable: true })
  async updateSubTask(
    @Args('id', { type: () => Int }) id: number,
    @Args('description') description: string,
  ) {
    return this.subTaskService.update(id, description);
  }

  @Mutation(() => Boolean)
  async deleteSubTask(@Args('id', { type: () => Int }) id: number) {
    return this.subTaskService.remove(id);
  }
}
