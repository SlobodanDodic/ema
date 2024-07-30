import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';

@ObjectType()
export class Payment {
  @Field()
  id: string;

  @Field({ nullable: true })
  amount: number;

  @Field({ nullable: true })
  entryDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}
