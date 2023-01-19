import {Resolver, Query, Arg, Ctx} from 'type-graphql';

import {ResultLogin} from './../models/ResultLogin';
import {Context} from './../../main';
import {User} from '../models/User';
import {COLLECTIONS, EXPIRE_TIME} from '../config/constants';
import {JWT} from '../lib/jwt';
import {IUser} from '../interface/IUser';

@Resolver()
export class LoginResolver {

  @Query(()=>Boolean)
  async login(@Arg('email')email :string,
              @Arg('password')password :string,
              @Ctx() {db} : Context): Promise<boolean>{
      try {
        const emailVerification = await db.collection<User>(COLLECTIONS.USERS)
                                      .findOne({email});

        if(emailVerification === null ){
          // return {
          //   status: false,
          //   message: 'usuario no existe',
          //   response: null
          // };
        }
        const loggedUser= await db.collection<IUser>(COLLECTIONS.USERS).findOne({email, password});

        delete loggedUser.password;
        delete loggedUser.birthday;
        delete loggedUser.registerDate;

        // return {
        //   status: true,
        //   message: (loggedUser !== null)? 'usuario encontrado':'usuario y password incorrectos, Sesion no iniciada',
        //   response:  (loggedUser !== null)? {value: new JWT().sign({user: loggedUser}, EXPIRE_TIME.D3)}:null
        // };
      } catch (error) {
        // return {
        //   status:false,
        //   message:'error al cargar el usuario',
        //   response:null
        // };
      }

      return true;
  }
}
