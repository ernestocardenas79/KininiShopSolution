import { ResultUser } from './../models/ResultUser';
import { User } from './../models/User';
import { MESSAGES } from './../config/constants';
import {IUser} from './../interface/IUser';
import {Resolver, Query, Arg, Ctx} from 'type-graphql';
import bcrypt from 'bcrypt';

import {ResultLogin} from './../models/ResultLogin';
import {Context} from './../../main';
import {User} from '../models/User';
import {COLLECTIONS, EXPIRE_TIME} from '../config/constants';
import {JWT} from '../lib/jwt';

@Resolver()
export class LoginResolver {

  @Query(()=>ResultLogin)
  async login(@Arg('email')email :string,
              @Arg('password')password :string,
              @Ctx() {db} : Context): Promise<ResultLogin>{
      try {
        const loggedUser = await db.collection<User>(COLLECTIONS.USERS)
                                      .findOne({email});

        if(loggedUser === null ){
          return {
            status: false,
            message: 'password y usuario no son correctos',
            token: null
          };
        }

        const passwordCheck = bcrypt.compareSync( password, loggedUser.password);

        if(passwordCheck !== null){
          delete loggedUser.password;
          delete loggedUser.birthday;
          delete loggedUser.registerDate;
        }

        const user:IUser = {...loggedUser, id: loggedUser.id.toString(), role: loggedUser.role.toString()};

        return {
          status: true,
          message: passwordCheck ? 'usuario encontrado':'usuario y password incorrectos, Sesion no iniciada',
          token:  passwordCheck ?  new JWT().sign({user}, EXPIRE_TIME.D3):null
        };
      } catch (error) {
        return {
          status:false,
          message:'password y usuario no son correctos',
          token:null
        };
      }
  }

  @Query(()=> ResultUser)
  me(@Ctx(){token}:Context):ResultUser {
    const info =new JWT().verify(token);
    if(info === MESSAGES.TOKEN_VERIFICATION_FAILED){
      return {
        status:false,
        message: 'info',
        result: null
      };
    }
    return {
      status:true,
      message: 'usuario autenticado correctamente',
      result: Object.values(info)[0]
    };
  }
}
