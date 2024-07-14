import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  hashedPassword: string;

  @Field()
  token: string;

  @Field()
  isActivated: boolean;

  @Field()
  updatedAt: Date;
}
