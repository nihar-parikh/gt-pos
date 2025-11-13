import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { User } from 'src/resources/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/users.service';
import { VerifyOtpResponse } from './dto/otp-verify.response';
import { ResetPasswordResponse } from './dto/reset-password.response';
import { SendOtpResponse } from './dto/send-otp.response';
import { ForgotPassword } from './entities/forgot-password.entity';

@Injectable()
export class ForgotPasswordService {
  constructor(
    @InjectRepository(ForgotPassword)
    private otpRepo: Repository<ForgotPassword>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private usersService: UsersService
  ) {}

  async sendOtp(phone: string): Promise<SendOtpResponse> {
    const user = await this.userRepo.findOne({ where: { phone } });
    if (!user)
      throw new BadRequestException('Please Enter Registered Mobile Number');

    const expiresTime = 2; // in minutes

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = await bcrypt.hash(otp, 10);
    const expires_at = new Date(Date.now() + expiresTime * 60 * 1000);

    await this.otpRepo.delete({ phone });
    await this.otpRepo.save({ phone, otp_hash: otpHash, expires_at });

    return {
      expiresTime: expiresTime,
      otp: otp,
    };
  }

  async verifyOtp(phone: string, otp: string): Promise<VerifyOtpResponse> {
    const record = await this.otpRepo.findOne({
      where: { phone },
      order: { created_at: 'DESC' },
    });

    if (!record) throw new BadRequestException('No OTP found for this number');
    if (record.expires_at < new Date())
      throw new BadRequestException('OTP is Expired. Please Enter Latest OTP');

    const isValid = await bcrypt.compare(otp, record.otp_hash);
    if (!isValid) throw new BadRequestException('Please Enter Correct OTP');

    const resetToken = randomBytes(32).toString('hex');

    record.verified = true;
    record.reset_token = resetToken;
    await this.otpRepo.save(record);

    return {
      token: resetToken,
      message: 'OTP verified successfully',
    };
  }

  async resetPassword(
    phone: string,
    resetToken: string,
    newPassword: string
  ): Promise<ResetPasswordResponse> {
    const record = await this.otpRepo.findOne({
      where: { phone, reset_token: resetToken, verified: true },
    });
    if (!record)
      throw new BadRequestException(
        'invalid request. Please verify OTP again.'
      );
    if (record.expires_at < new Date()) {
      throw new BadRequestException(
        'Reset token expired. Please request a new one.'
      );
    }
    await this.usersService.updatePassword(phone, newPassword);

    record.verified = false;
    record.reset_token = '';
    await this.otpRepo.save(record);

    return {
      message: 'Password reset successful',
    };
  }
}
