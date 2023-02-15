import {HttpException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {compare} from "bcrypt";
import {DatabaseService} from "../database/database.service";
import {AuthModel} from "./auth.model";
import {IAuthDocument, TSignInResponse, TSignUpResponse} from "./types";

@Injectable()
export class AuthService {
  private model: AuthModel
  constructor(db: DatabaseService, private jwtService: JwtService) {
    this.model = new AuthModel(db);
  }

  async signUp(body: IAuthDocument): Promise<TSignUpResponse> {
    const doc = await this.model.createWithHash(body);
    const id = doc._id.toString();
    const token = await this.jwtService.signAsync({id});
    return {token, id};
  }

  async signIn(body: IAuthDocument): Promise<TSignInResponse> {
    const doc = await this.model.findOne(body.id);
    if (!doc) {
      throw new HttpException('Bad id or password', 401);
    }
    const result = await compare(body.password.toString(), doc.password);
    if (!result) {
      throw new HttpException('Bad id or password', 401);
    }
    const token = await this.jwtService.signAsync({id: doc._id.toString()});
    return {token};
  }
}