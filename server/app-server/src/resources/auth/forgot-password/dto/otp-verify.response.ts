import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyOtpResponse {
  @Field()
  message: string;

  @Field()
  token: string;
}
