import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/resources/users/entities/user.entity';
import { UsersService } from '../../users/users.service';
import { ForgotPassword } from './entities/forgot-password.entity';
import { ForgotPasswordResolver } from './forgot-password.resolver';
import { ForgotPasswordService } from './forgot-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([ForgotPassword, User])],
  providers: [ForgotPasswordResolver, ForgotPasswordService, UsersService],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
