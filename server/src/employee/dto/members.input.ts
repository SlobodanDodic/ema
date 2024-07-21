import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class HealthCareMemberInput {
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
