import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class JobsInput {
  @IsNotEmpty()
  @Field()
  value: string;
}
