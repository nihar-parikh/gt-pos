import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsNotEmpty({ message: 'Mobile number is required' })
  @Matches(/^[0-9]{10}$/, { message: 'Please Enter Valid Mobile Number' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'Reset token is required' })
  resetToken: string;

  @Field()
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  newPassword: string;
}
