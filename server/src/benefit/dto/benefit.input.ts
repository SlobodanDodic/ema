import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class BenefitInput {
  @IsDate()
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
