import { Field, ObjectType } from '@nestjs/graphql';
import { Employee } from './employee.entity';

@ObjectType()
export class FitpassMember {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  start?: Date;

  @Field({ nullable: true })
  end?: Date;

  @Field()
  employeeId: number;

  @Field((_type) => Employee)
  employee: Employee;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
