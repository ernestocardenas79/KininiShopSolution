import {Arg, Ctx, Mutation, Resolver, Query} from 'type-graphql';
import bcrypt from 'bcrypt';

import {UserInput} from '../models/UserInput';
import {COLLECTIONS} from '../config/constants';
import {Context} from '../../main';
import {User} from '../models/User';
import {ResultUser} from '../models/ResultUser';
import {ResultUsers} from '../models/ResultUsers';

@Resolver()
export class UserResolver {
  @Query(() => ResultUsers, {
    description: 'Lista detallada usuarios registrados en la Base de datos',
  })
  async users(@Ctx() {db}: Context) : Promise<ResultUsers>{
    try {

      const dbUsers =await db.collection<User>(COLLECTIONS.USERS).find().toArray();

      return {
        status: true,
        message:'lista de usuarios regresada correctamente',
        result: dbUsers
      };
    } catch (error) {
      console.log(error);
      return {
        status:false,
        message:'ocurrio un error al intentar retornar la lista de usuarios',
        result:[]
      };
    }
  }

  @Query(()=>ResultUser, {
    description: 'Lista detallada usuarios registrados en la Base de datos',
  })
  async usersU(@Arg('email') email: string,
              @Ctx() {db}: Context): Promise<ResultUser>{
    try {

      const user =await db.collection<User>(COLLECTIONS.USERS).findOne({email});

      return {
        status: true,
        message:'lista de usuarios regresada correctamente',
        result: user
      };

    } catch (error) {
      console.log(error);
      return {
        status:false,
        message:'ocurrio un error al intentar retornar la lista de usuarios',
        result: null
      };
    }
  }

  @Mutation(() => ResultUser)
  async register(@Arg('user') userInput: UserInput, @Ctx() {db}: Context):Promise<ResultUser> {
    const userCheck = await db
      .collection(COLLECTIONS.USERS)
      .findOne({email : userInput.email});

    if(userCheck !== null){
      return {
        status: false,
        message: `El email ${userInput.email} ya se encuentra registrado`,
        result: null
      };
    }

    // Comprobar el ultimo usuario registrado para asignar ID
    const lastUser = await db
      .collection(COLLECTIONS.USERS)
      .find()
      .limit(1)
      .sort({registerDate: 1})
      .toArray();

    if (lastUser.length == 0) {
      userInput.id = 1;
    } else {
      userInput.id = lastUser[0].id + 1;
    }
    //Asignar la fecha en formato ISO en la propiedad registerDate
    userInput.registerDate = new Date().toISOString();
    userInput.password= bcrypt.hashSync(userInput.password, 10);


    // Guardar el documento registro en la coleccion
    return await db
      .collection(COLLECTIONS.USERS)
      .insertOne(userInput)
      .then(async () => {
        return  {
          status: true,
          message: `registro exitoso`,
          result: userInput
        } as ResultUser;
      })
      .catch((err: Error) => {
        console.log(err.message);
        return {
          status: false,
          message: `ocurrio un error al intentar registrar el usuario`,
          result: userInput
        } as ResultUser;
      });
  }
}
