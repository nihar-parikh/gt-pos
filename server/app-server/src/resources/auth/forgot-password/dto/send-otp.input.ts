import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class SendOtpInput {
  @Field()
  @IsNotEmpty({ message: 'Mobile number is required' })
  @Matches(/^[0-9]{10}$/, { message: 'Please Enter Valid Mobile Number' })
  phone: string;
}
