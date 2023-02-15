import {HttpException, Injectable} from "@nestjs/common";
import {DatabaseService} from "../database/database.service";
import {ToDoModel} from "./todo.model";
import {IToDoDocument, TIdResponse} from "./types";

@Injectable()
export class ToDoService {
  private model: ToDoModel
  constructor(db: DatabaseService) {
    this.model = new ToDoModel(db);
  }

  async create(body: IToDoDocument): Promise<TIdResponse> {
    const doc = await this.model.save(body);
    return {id: doc._id};
  }

  async list(userId: string): Promise<Partial<IToDoDocument>[]> {
    const docs = await this.model.find({owner: userId});
    return docs.length ? docs.map(this.buildResponse) : [];
  }

  async getOne(id: string, userId: string): Promise<Partial<IToDoDocument>> {
    const doc = await this.model.findOne(id);
    if (doc.owner.toString() !== userId) {
      throw new HttpException('Is not an owner', 403);
    }
    return this.buildResponse(doc);
  }

  async remove(id: string, userId: string): Promise<TIdResponse> {
    await this.getOne(id, userId);
    await this.model.remove(id);
    return {id};
  }

  private buildResponse(doc: IToDoDocument): Partial<IToDoDocument> {
    const obj = doc.toObject();
    delete obj['owner'];
    delete obj['__v'];
    obj.id = obj._id;
    delete obj['_id'];
    return obj;
  }
}