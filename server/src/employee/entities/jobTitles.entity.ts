import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
class JobTitles {
  @Field(() => String)
  jobTitle: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class JobTitleResponse {
  @Field(() => Int)
  totalEmployees: number;

  @Field(() => [JobTitles])
  getJobTitleCounts: JobTitles[];
}
