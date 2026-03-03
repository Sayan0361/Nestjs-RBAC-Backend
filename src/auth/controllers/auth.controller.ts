import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {}

    // POST : auth/register
    /**
     * 
     * {
            "email" : "user1@gmail.com",
            "name" : "user1",
            "password" : "user1"
        }
     */
    @Post('register')
    register(@Body() registerBody : RegisterDto) {
        return this.authService.createUserAccount(registerBody);
    }

    // POST : auth/login
    /**
     * 
     * {
            "email" : "user1@gmail.com",
            "password" : "user1"
        }
     */
    @Post('login')
    login(@Body() loginBody : LoginDto) {
        return this.authService.login(loginBody);
    }

    // POST : auth/refresh
    /**
     * 
     * {
            "refreshToken": "PASTE_REFRESH_TOKEN_HERE"
        }
     */
    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken : string) {
        return this.authService.refreshToken(refreshToken);
    }

    // AuthGuard (protected routes)
    // Current user route 
    // Create admin
}
