import {Controller, Get, Post, Req} from "@nestjs/common";
import {Auth} from "src/auth";
import {BodySignIn, BodySignUp} from "src/body.decorator";
import {AuthService} from "./auth.service";
import {IAuthDocument, TIdResponse, TSignInResponse, TSignUpResponse} from "./types";

@Controller('auth')
export class AuthController {

  constructor(private service: AuthService) {}
  
  @Post('signup')
  async signUp(@BodySignUp() body: IAuthDocument): Promise<TSignUpResponse> {
    return this.service.signUp(body)
  }

  @Post('signin')
  async signIn(@BodySignIn() body: IAuthDocument): Promise<TSignInResponse> {
    return this.service.signIn(body);
  }

  @Auth()
  @Get('user') 
  async getUser(@Req() req): Promise<TIdResponse> {
    return {id: req.user.id};
  }
}