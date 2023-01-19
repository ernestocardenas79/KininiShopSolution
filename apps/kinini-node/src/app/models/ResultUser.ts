import {Field, ObjectType} from 'type-graphql';
import {ResultBase} from './ResultBase';
import {User} from './User';

@ObjectType()
export class ResultUser extends ResultBase {

  @Field(()=>User)
  reuslt: User;
}
