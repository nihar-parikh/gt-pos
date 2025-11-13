import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/resources/users/users.service';
import { CreateAuthInput } from './dto/create-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<CreateAuthInput> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // check password
    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      username: user.username,
      isAdmin: user.isAdmin,
    };
  }
}
