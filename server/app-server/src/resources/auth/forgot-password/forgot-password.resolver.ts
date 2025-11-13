import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { VerifyOtpResponse } from './dto/otp-verify.response';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ResetPasswordResponse } from './dto/reset-password.response';
import { SendOtpInput } from './dto/send-otp.input';
import { SendOtpResponse } from './dto/send-otp.response';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { ForgotPassword } from './entities/forgot-password.entity';
import { ForgotPasswordService } from './forgot-password.service';

@Resolver(() => ForgotPassword)
export class ForgotPasswordResolver {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Mutation(() => SendOtpResponse)
  async sendOtp(@Args('input') input: SendOtpInput): Promise<SendOtpResponse> {
    return this.forgotPasswordService.sendOtp(input.phone);
  }

  @Mutation(() => VerifyOtpResponse)
  async verifyOtp(
    @Args('input') input: VerifyOtpInput
  ): Promise<VerifyOtpResponse> {
    return this.forgotPasswordService.verifyOtp(input.phone, input.otp);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('input') input: ResetPasswordInput
  ): Promise<ResetPasswordResponse> {
    return this.forgotPasswordService.resetPassword(
      input.phone,
      input.resetToken,
      input.newPassword
    );
  }
}
