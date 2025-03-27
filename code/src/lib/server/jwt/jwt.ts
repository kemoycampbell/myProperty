import jwt from 'jsonwebtoken';
import { UserException } from '../exceptions/UserException';

export function generate(payload:any, secret:string =process.env.JWT_SECRET!,expire:string=process.env.JWT_EXPIRATION_TIME!):string{
    if(!secret){
        throw new Error("SECRET missing from the env");
    }

    if(!expire){
        throw new Error("EXPIRATION_TIME missing from the env");
    }

    return jwt.sign(payload,secret,{expiresIn:expire});
}

export function verifyToken(token:string,secret:string =process.env.JWT_SECRET!):boolean{

    if(!secret){
        throw new Error("SECRET missing from the env");
    }

    try{
        jwt.verify(token,secret);
        return true;
    }
    catch(e){
        throw new UserException("Invalid token",401);
    }
}

export function decodeToken(token:string):any{
    return jwt.decode(token);
}

export default {generate,verifyToken, decodeToken};