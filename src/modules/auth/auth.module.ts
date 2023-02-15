import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "src/jwt.strategy";
import {DatabaseModule} from "../database/database.module";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";

@Module({
  imports: [DatabaseModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '600s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
