import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/resources/users/dto/create-user.input';
import { User } from 'src/resources/users/entities/user.entity';
import { UsersService } from 'src/resources/users/users.service';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Mutation(() => User, { name: 'signUp' })
  async signUp(@Args('input') input: CreateUserInput): Promise<User> {
    // Assuming 'create' is the correct method to register a user
    return await this.usersService.create(input);
  }

  @Mutation(() => CreateAuthInput, { name: 'login' })
  async signIn(
    @Args('credentials') credentials: CreateUserInput
  ): Promise<CreateAuthInput> {
    return this.authService.signIn(credentials.username, credentials.password);
  }
}
