import { InputType, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

@InputType()
export class HealthCareMemberInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  id: number;

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
  @Field({ nullable: true })
  start?: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  end?: Date;
}

@InputType()
export class FitpassMemberInput {
  @IsNotEmpty()
  @IsNumber()
  @Field()
  id: number;

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
  @Field({ nullable: true })
  start?: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  end?: Date;
}
