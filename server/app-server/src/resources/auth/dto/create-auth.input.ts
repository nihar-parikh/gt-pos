import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateAuthInput {
  @Field()
  accessToken: string;

  @Field()
  username: string;

  @Field()
  isAdmin: boolean;
}
