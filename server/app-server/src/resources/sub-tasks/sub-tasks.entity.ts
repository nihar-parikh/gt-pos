import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/tasks.entity';

@ObjectType()
@Entity()
export class SubTask {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  description: string;

  @Field(() => Task)
  @ManyToOne(() => Task, task => task.subTasks, { onDelete: 'CASCADE' })
  task: Task;
}
