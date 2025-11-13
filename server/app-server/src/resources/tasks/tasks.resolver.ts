import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Action,
  CaslAbilityFactory,
} from 'src/resources/auth/casl/casl-ability.factory/casl-ability.factory';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './tasks.entity';
import { TaskService } from './tasks.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => [Task])
  async tasks() {
    return this.taskService.findAll();
  }

  @Query(() => Task, { nullable: true })
  async task(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @Context('req') req: any,
  ): Promise<Task> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const user = req.user;
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log('object', ability.can(Action.Create, Task));
    if (ability.can(Action.Create, Task)) {
      console.log('data >>>', createTaskInput);
      return await this.taskService.create(createTaskInput);
    } else {
      throw new UnauthorizedException(
        'You do not have permission to add a task.',
      );
    }
  }

  @Mutation(() => Task, { nullable: true })
  async updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }
}
