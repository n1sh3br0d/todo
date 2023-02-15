import {Module} from "@nestjs/common";
import {JwtStrategy} from "src/jwt.strategy";
import {DatabaseModule} from "../database/database.module";
import {ToDoController} from "./todo.controller";
import {ToDoService} from "./todo.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ToDoController],
  providers: [ToDoService, JwtStrategy],
})
export class TodoModule {}