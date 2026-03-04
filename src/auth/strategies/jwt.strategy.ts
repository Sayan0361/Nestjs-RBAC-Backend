import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../services/auth.service";

// Headers : {
//     token : `Bearer ${token}`
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService : AuthService) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : process.env.JWT_ACCESS_SECRET!
        });
    }

    async validate(payload: any) {
        try{
            const user = this.authService.getUserById(payload.sub);

            return {
                ...user,
                role : payload.role
            }
        } catch(error) {
            throw new UnauthorizedException(
                `Invalid Token`
            )
        }
    }
}