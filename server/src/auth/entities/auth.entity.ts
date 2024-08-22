import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  hashedPassword: string;

  @Field({ nullable: true })
  hashedToken?: string;

  @Field()
  isActivated: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
