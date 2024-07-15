import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(7, 14, { message: 'Password has to be between 7 and 14 chars' })
  @Field()
  password: string;
}
