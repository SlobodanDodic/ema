import { FitpassMemberInput, HealthCareMemberInput } from './members.input';
import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class EmployeeInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  jobTitle: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  phoneNumber: string;

  @IsDate()
  @Field()
  birthday?: Date;

  @IsDate()
  @Field()
  contract?: Date;

  @IsDate()
  @Field()
  eyes?: Date;

  @IsDate()
  @Field()
  safety?: Date;

  @IsDate()
  @Field()
  fire?: Date;

  @IsDate()
  @Field()
  firstAid?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HealthCareMemberInput)
  @Field(() => [HealthCareMemberInput], { nullable: true })
  healthCareMembers: HealthCareMemberInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FitpassMemberInput)
  @Field(() => [FitpassMemberInput], { nullable: true })
  fitpassMembers: FitpassMemberInput[];
}
