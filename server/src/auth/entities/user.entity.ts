import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  hashedPassword: string;

  @Field()
  hashedToken: string;

  @Field()
  isActivated: boolean;
}
