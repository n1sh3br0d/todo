import {Injectable} from "@nestjs/common";
import {Schema, SchemaDefinition} from "mongoose";
import {BaseModel} from "../base/base.model";
import {DatabaseService} from "../database/database.service";
import {IToDoDocument} from "./types";

const schema: SchemaDefinition = {
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'auth',
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
};

@Injectable()
export class ToDoModel extends BaseModel<IToDoDocument> {
  constructor(db: DatabaseService) {
    super(db.connection, new Schema<IToDoDocument>(schema), 'todo');
  }
}