import {Document} from "mongoose";

export interface IToDoDocument extends Document {
  title: string;
  description: string;
  owner?: string;
}

export type TIdResponse = {id: string};