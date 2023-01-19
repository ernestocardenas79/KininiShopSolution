import {Field, Int, ObjectType} from 'type-graphql';

@ObjectType()
export default class Recipe {
  @Field()
  title: string;

  @Field()
  description?: string;

  @Field(()=> [Int])
  ratings: number[];
}
