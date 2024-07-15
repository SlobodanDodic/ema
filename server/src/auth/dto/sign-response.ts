import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/user.entity';

@ObjectType()
export class SignResponse {
  @IsNotEmpty()
  @IsString()
  @Field()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  refreshToken: string;

  @Field(() => User)
  user: User;
}
