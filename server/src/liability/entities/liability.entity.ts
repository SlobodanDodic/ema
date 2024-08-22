import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';

@ObjectType()
export class Liability {
  @Field()
  id: string;

  @Field()
  amount: number;

  @Field()
  recordedDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Employee, { nullable: true })
  employee?: Employee;
}
