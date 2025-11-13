import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendOtpResponse {
  @Field(() => Int, { nullable: true })
  expiresTime?: number;

  @Field(() => Int, { nullable: true })
  otp: string;
}
