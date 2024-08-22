import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Jobs {
  @Field()
  id: string;

  @Field()
  value: string;
}
