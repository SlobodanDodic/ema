import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Benefit {
  @Field()
  id: string;

  @Field()
  value: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  employeeDiscount: number;
}
