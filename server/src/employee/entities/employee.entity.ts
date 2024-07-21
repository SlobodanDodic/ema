import { ObjectType, Field } from '@nestjs/graphql';
import { HealthCareMember } from './healthcare.entity';
import { FitpassMember } from './fitpass.entity';

@ObjectType()
export class Employee {
  @Field()
  id: number;

  @Field()
  fullName: string;

  @Field()
  jobTitle: string;

  @Field()
  phoneNumber: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  contract?: Date;

  @Field({ nullable: true })
  eyes?: Date;

  @Field({ nullable: true })
  safety?: Date;

  @Field({ nullable: true })
  fire?: Date;

  @Field({ nullable: true })
  firstAid?: Date;

  @Field((_type) => [HealthCareMember])
  healthCareMembers: HealthCareMember[];

  @Field((_type) => [FitpassMember])
  fitpassMembers: FitpassMember[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
