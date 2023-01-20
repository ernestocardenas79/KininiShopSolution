import {Field, ObjectType} from 'type-graphql';
import {ResultBase} from './ResultBase';

@ObjectType()
export class ResultLogin extends ResultBase {
  @Field(()=>String,{nullable:true})
  token: string;
}
