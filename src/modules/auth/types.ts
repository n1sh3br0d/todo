import {Document} from "mongoose";

export interface IAuthDocument extends Document {
  password: string;
}

export type TIdResponse = {id: string};

export type TSignInResponse = {token: string};

export type TSignUpResponse = TIdResponse & TSignInResponse;