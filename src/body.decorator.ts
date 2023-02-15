import {BadRequestException, createParamDecorator, ExecutionContext} from "@nestjs/common";

export const BodyToDo = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.body?.title) {
      throw new BadRequestException(`Missing required param: 'title'`);
    }
    if (!request.body?.description) {
      throw new BadRequestException(`Missing required param: 'descriprion'`);
    }
    
    return {
      title: request.body.title, 
      description: request.body.description, 
      owner: request.user.id
    }
  }
)

export const BodySignIn = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.body?.id) {
      throw new BadRequestException(`Missing required param: 'id'`);
    }
    if (!request.body?.password) {
      throw new BadRequestException(`Missing required param: 'password'`);
    }

    return {
      id: request.body.id, 
      password: request.body.password
    }
  }
)

export const BodySignUp = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.body?.password) {
      throw new BadRequestException(`Missing required param: 'password'`);
    }

    return {
      password: request.body.password
    }
  }
)