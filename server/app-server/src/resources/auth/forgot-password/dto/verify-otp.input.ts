import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class VerifyOtpInput {
  @Field()
  @IsNotEmpty({ message: 'Mobile number is required' })
  @Matches(/^[0-9]{10}$/, { message: 'Please Enter Valid Mobile Number' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'OTP is required' })
  @Matches(/^[0-9]{4,6}$/, { message: 'OTP must be 4 to 6 digits long' })
  otp: string;
}
