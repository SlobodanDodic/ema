import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class JobTitles {
  @Field(() => String)
  jobTitle: string;

  @Field(() => Int)
  count: number;

  @Field(() => Int)
  totalEmployees: number;
}
