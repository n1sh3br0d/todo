import {Injectable} from "@nestjs/common";
import {hash} from "bcrypt";
import {Schema, SchemaDefinition} from "mongoose";
import {BaseModel} from "../base/base.model";
import {DatabaseService} from "../database/database.service";
import {IAuthDocument} from "./types";

const schema: SchemaDefinition = {
  password: {
    type: String,
    required: true,
  }
};

@Injectable()
export class AuthModel extends BaseModel<IAuthDocument> {
  constructor(db: DatabaseService) {
    super(db.connection, new Schema<IAuthDocument>(schema), 'auth');
  }

  async createWithHash(body: IAuthDocument): Promise<IAuthDocument> {
    const password = await hash(body.password.toString(), 10);
    return this.save({password} as IAuthDocument);
  }
}