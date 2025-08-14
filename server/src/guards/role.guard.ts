import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRoles } from "@prisma/client";
import { Request } from "express";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/decoratores";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const roles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request & {id: string, role: UserRoles}>();

    const role = request.role;

    if(!roles || !roles.includes(role)){
      throw new ForbiddenException('You cannot perform this action');
    }

    return true
  }
}