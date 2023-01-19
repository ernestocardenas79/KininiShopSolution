import {SECRET_KEY, MESSAGES, EXPIRE_TIME} from './../config/constants';

import jwt from 'jsonwebtoken';
import {IJwt} from '../interface/IJwt';

export class JWT {
  private secretKey = SECRET_KEY as string;

  sign(data:IJwt, expiresIn: number = EXPIRE_TIME.H24){
    return jwt.sign(
      {user: data.user},
      this.secretKey,
      {expiresIn}
    );
  }

  verify(token:string){
    try {
      return jwt.verify(token, this.secretKey);
    } catch (e) {
      return MESSAGES.TOKEN_VERIFICATION_FAILED;
    }
  }
}
