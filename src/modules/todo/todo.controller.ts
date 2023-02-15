import {Controller, Delete, Get, Param, Post, Req} from "@nestjs/common";
import {Auth} from "src/auth";
import {BodyToDo} from "src/body.decorator";
import {ToDoService} from "./todo.service";
import {IToDoDocument, TIdResponse} from "./types";

@Auth()
@Controller('todo')
export class ToDoController {

  constructor(private service: ToDoService) {}

  @Get()
  async list(@Req() req): Promise<Partial<IToDoDocument>[]> {
    return this.service.list(req.user.id);
  }

  @Get('id')
  async getOne(@Req() req, @Param('id') id: string): Promise<Partial<IToDoDocument>> {
    return this.service.getOne(id, req.user.id);
  }

  @Delete('id')
  async remove(@Req() req, @Param('id') id: string): Promise<TIdResponse> {
    return this.service.remove(id, req.user.id);
  }

  @Post()
  async create(@BodyToDo() body: IToDoDocument): Promise<TIdResponse> {
    return this.service.create(body);
  }
}