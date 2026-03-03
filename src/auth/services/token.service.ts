import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) { }

    generateAccessToken(user: UserEntity): string {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
        };

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '15m',
        });
    }

    generateRefreshToken(user: UserEntity): string {
        const payload = { sub: user.id };

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });
    }

    generateTokens(user: UserEntity) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user),
        };
    }

    verifyRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        } catch {
            throw new UnauthorizedException('Invalid Token');
        }
    }
}