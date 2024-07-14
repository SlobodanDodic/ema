import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
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
  createdAt: Date;
}
