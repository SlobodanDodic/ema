import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class HealthCareMemberInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
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
  @Field({ nullable: true })
  start?: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  end?: Date;
}

@InputType()
export class FitpassMemberInput {
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
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
  @Field({ nullable: true })
  start?: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  end?: Date;
}
