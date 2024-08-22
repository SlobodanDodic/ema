import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from './employee.entity';

@ObjectType()
export class HealthCareMember {
  @Field()
  id?: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  insurance: string;

  @Field()
  start?: Date;

  @Field()
  end?: Date;

  @Field()
  employeeId: string;

  @Field((_type) => Employee)
  employee: Employee;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
