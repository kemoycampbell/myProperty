const SECRET:string = process.env.JWT_SECRET!;
const EXPIRATION_TIME:string = process.env.JWT_EXPIRATION_TIME!;
import jwt from 'jsonwebtoken';
import { UserException } from '../exceptions/UserException';

export function generate(payload:any):string{
    return jwt.sign(payload,SECRET,{expiresIn:EXPIRATION_TIME});
}

export function verifyToken(token:string):boolean{
    try{
        jwt.verify(token,SECRET);
        return true;
    }
    catch(e){
        throw new UserException("Invalid token",401);
    }
}

export default {generate,verifyToken};