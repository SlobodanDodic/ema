import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class BenefitInput {
  @IsNotEmpty()
  @Field()
  value: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  employeeDiscount: number;
}
