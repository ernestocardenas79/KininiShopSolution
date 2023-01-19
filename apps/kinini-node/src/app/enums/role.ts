import {registerEnumType} from 'type-graphql';

export enum Role {
  CLIENT,
  ADMIN
}

registerEnumType(Role,{
   name: 'ROLE',
   description: 'Roles for the application'
});
