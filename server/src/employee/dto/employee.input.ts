import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FitpassMemberInput, HealthCareMemberInput } from './members.input';

@InputType()
export class EmployeeInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  fullName: string;

  @IsString()
  @IsOptional()
  @Field()
  jobTitle?: string;

  @IsString()
  @IsOptional()
  @Field()
  phoneNumber?: string;

  @IsDate()
  @IsOptional()
  @Field()
  birthday?: Date;

  @IsDate()
  @IsOptional()
  @Field()
  contract?: Date;

  @IsNumber()
  @IsOptional()
  @Field()
  cumulativeLiabilities?: number;

  @IsDate()
  @IsOptional()
  @Field()
  lastCalculation?: Date;

  @IsDate()
  @IsOptional()
  @Field()
  eyes?: Date;

  @IsDate()
  @IsOptional()
  @Field()
  safety?: Date;

  @IsDate()
  @IsOptional()
  @Field()
  fire?: Date;

  @IsDate()
  @IsOptional()
  @Field()
  firstAid?: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HealthCareMemberInput)
  @Field(() => [HealthCareMemberInput])
  healthCareMembers: HealthCareMemberInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FitpassMemberInput)
  @Field(() => [FitpassMemberInput])
  fitpassMembers: FitpassMemberInput[];
}
