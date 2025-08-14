import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoles } from "@prisma/client";
import { Request } from "express";
import { PROTECTED_KEY, Roles } from "src/decoratores";
import { JwtHelper } from "src/helpers";

interface IRequest {
  role: string;
  id: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly jwt: JwtHelper) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const isProtected = this.reflector.getAllAndOverride<boolean>(
      PROTECTED_KEY,
      [context.getHandler(), context.getClass()]
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request & { role: string, id: string}>();

    if(!isProtected){
      request.role = UserRoles.User
      return true;
    }

    const token = request.cookies['token'];

    const data:IRequest = await this.jwt.verifyToken(token);

    request.role = data.role;
    request.id = data.id;

    return true
  }
}