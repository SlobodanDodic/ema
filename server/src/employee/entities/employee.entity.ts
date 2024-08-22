import { Field, ObjectType } from '@nestjs/graphql';
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

  @Field()
  eyes?: Date;

  @Field()
  safety?: Date;

  @Field()
  fire?: Date;

  @Field()
  firstAid?: Date;

  @Field(() => [HealthCareMember])
  healthCareMembers: HealthCareMember[];

  @Field(() => [FitpassMember])
  fitpassMembers: FitpassMember[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
