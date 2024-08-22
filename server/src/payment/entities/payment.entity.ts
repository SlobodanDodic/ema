import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';

@ObjectType()
export class Payment {
  @Field()
  id: string;

  @Field()
  amount: number;

  @Field()
  entryDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}
