import {Field, ObjectType} from 'type-graphql';

@ObjectType({isAbstract: true})
export abstract class ResultBase {
  @Field()
  status: boolean;
  @Field()
  message: string;
}



