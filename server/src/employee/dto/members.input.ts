import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class HealthCareMemberInput {
  @IsString()
  @IsOptional()
  @Field()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  category: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  insurance: string;

  @IsOptional()
  @IsDate()
  @Field()
  start?: Date;

  @IsOptional()
  @IsDate()
  @Field()
  end?: Date;
}

@InputType()
export class FitpassMemberInput {
  @IsString()
  @IsOptional()
  @Field()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  category: string;

  @IsOptional()
  @IsDate()
  @Field()
  start?: Date;

  @IsOptional()
  @IsDate()
  @Field()
  end?: Date;
}
