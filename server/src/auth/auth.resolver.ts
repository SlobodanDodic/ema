import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignUpInput } from './dto/signup.input';
import { SignResponse } from './dto/sign-response';
import { SignInInput } from './dto/signin.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Mutation(() => SignResponse)
  signin(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signin(signInInput);
  }

  @Query(() => [Auth], { name: 'users' })
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth)
  updateUser(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.authService.remove(id);
  }
}
