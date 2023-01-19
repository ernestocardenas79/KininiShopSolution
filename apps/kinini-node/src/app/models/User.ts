import {Role} from '../enums/role';
import {Field, ID, ObjectType} from 'type-graphql';

@ObjectType({description: `Vamos a especificar la informacion detallada del usuario.
* Vamos a tener en cuenta:
email = usuario del cliente de la base de datos.
Fecha de nacimiento y registro en formato ISO`})
export class User {

  @Field(()=>ID,{description:'Identificador únicos'})
  id: number;

  @Field(()=> String,{description:'Nombre de pila'})
  name: string;

  @Field(()=>String,{description:'Apellido/s'})
  lastname: string;

  @Field(()=>String,{description: 'Correo electronico'})
  email: string;

  @Field(()=> String,{description: 'Password asociado a la cuenta'})
  password: string;

  @Field(()=>String, {description: 'Fecha de registro en la Base de datos'})
  registerDate: string;

  @Field(()=>String, {description: 'Fecha de nacimiento - Solo mayores de 18 años'})
  birthday: string;

  @Field(()=>Role, {description: 'Permisos del usuario'})
  role: Role;
 }


