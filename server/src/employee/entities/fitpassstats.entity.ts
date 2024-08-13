import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FitpassStats {
  @Field(() => Int)
  Fitpass: number;

  @Field(() => Int)
  Without: number;

  @Field(() => Int)
  totalEmployees: number;
}

@ObjectType()
class FitpassCount {
  @Field(() => String)
  category: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class FitpassCategoryResponse {
  @Field(() => Int)
  totalMembers: number;

  @Field(() => [FitpassCount])
  getFitpassCounts: FitpassCount[];

  @Field(() => [FitpassCount])
  getFitpassAllCounts: FitpassCount[];
}
