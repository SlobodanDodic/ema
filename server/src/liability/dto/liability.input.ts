import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class LiabilityInput {
  @IsNotEmpty()
  @Field()
  employeeId: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  amount: number;

  @IsDate()
  @Field()
  recordedDate: Date;
}
