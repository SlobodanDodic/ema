import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignUpInput } from './dto/signup.input';
import { SignResponse } from './dto/sign-response';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Query(() => [Auth], { name: 'auths' })
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => Auth)
  removeAuth(@Args('id', { type: () => String }) id: string) {
    return this.authService.remove(id);
  }
}
