import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdatePaymentInput {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
