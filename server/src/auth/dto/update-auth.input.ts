import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
  @IsString()
  @Field()
  id: string;
}
