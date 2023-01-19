import {Field, ID, InputType} from 'type-graphql';
import {Role} from '../enums/role';

@InputType()
export class UserInput {
  @Field(()=>ID,{description:'Identificador únicos', nullable:true})
  id?: number;

  @Field(()=> String,{description:'Nombre de pila'})
  name: string;

  @Field(()=>String,{description:'Apellido/s'})
  lastname: string;

  @Field(()=>String,{description: 'Correo electronico'})
  email: string;

  @Field(()=> String,{description: 'Password asociado a la cuenta'})
  password: string;

  @Field(()=>String, {description: 'Fecha de registro en la Base de datos', nullable: true})
  registerDate: string;

  @Field(()=>String, {description: 'Fecha de nacimiento - Solo mayores de 18 años'})
  birthday: string;

  @Field(()=>Role, {description: 'Permisos del usuario', defaultValue: Role.CLIENT})
  role: Role;
}
