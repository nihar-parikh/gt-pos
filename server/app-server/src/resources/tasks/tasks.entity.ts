import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubTask } from '../sub-tasks/sub-tasks.entity';

@ObjectType()
@Entity()
export class Task {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [SubTask], { nullable: true })
  @OneToMany(() => SubTask, (subTask: SubTask) => subTask.task)
  subTasks: SubTask[];
}
