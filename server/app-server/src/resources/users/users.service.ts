import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userModel: Repository<User>
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.userModel.create(data);
    return await this.userModel.save(user);
  }

  findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async updatePassword(phone: string, newPassword: string): Promise<void> {
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.userModel.update({ phone }, { password: hashed });
  }
}
