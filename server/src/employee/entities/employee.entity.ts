import { Field, Float, ObjectType } from '@nestjs/graphql';
import { FitpassMember } from './fitpass.entity';
import { HealthCareMember } from './healthcare.entity';

@ObjectType()
export class Employee {
  @Field()
  id: string;

  @Field()
  fullName: string;

  @Field()
  jobTitle?: string;

  @Field()
  phoneNumber?: string;

  @Field()
  birthday?: Date;

  @Field()
  contract?: Date;

  @Field((_type) => Float, { nullable: true })
  cumulativeLiabilities?: number;

  @Field()
  lastCalculation?: Date;

  @Field()
  eyes?: Date;

  @Field()
  safety?: Date;

  @Field()
  fire?: Date;

  @Field()
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
