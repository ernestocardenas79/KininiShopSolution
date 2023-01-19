import {Field, ObjectType} from 'type-graphql';
import {ResultBase} from './ResultBase';

@ObjectType()
export class ResultLogin extends ResultBase {
  @Field()
  token: string;
}
