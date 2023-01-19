import {Field, ObjectType} from 'type-graphql';
import {ResultBase} from './ResultBase';
import {User} from './User';

@ObjectType()
export class ResultUsers extends ResultBase {

  @Field(()=>[User])
  result: User[];
}
