import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/roles.decorators";

// Client sends req
// Req goes to jwt-auth.guard.ts
// jwt-auth.guard.ts will validate the token and it will attach the current user in the req
// rolesguard will then check if the current user role matches the required role
// If the current user is normal user, but required role is ADMIN, dont give him access
// Else proceed to the controller
@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector : Reflector) {
        // ...
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY, [
                context.getHandler(), // method level metadata
                context.getClass() // class level metadata
            ]
        );

        if(!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        if(!user) {
            throw new ForbiddenException(
                `User Not Authenticated`
            );
        }

        const hasRequiredRole = requiredRoles.some(
            role => user.role === role
        );

        if(!hasRequiredRole) {
            throw new ForbiddenException(
                `Insufficient Permission`
            );
        }

        return true;
    }
}