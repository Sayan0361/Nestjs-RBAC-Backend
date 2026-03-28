import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Roles } from '../decorators/roles.decorators';
import { UserRole } from '../entities/user.entity';
import { RolesGuard } from '../guards/roles-guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ) {}

    // POST : auth/register
    /**
     *  Body :
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
     *  Body :
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
     *  Body:
     * {
            "refreshToken": "PASTE_REFRESH_TOKEN_HERE"
        }
     */
    @Post('refresh')
    refreshToken(@Body('refreshToken') refreshToken : string) {
        return this.authService.refreshToken(refreshToken);
    }

    // AuthGuard (protected routes) [RBAC]

    // GET :  auth/profile
    /**
     * 
        Header : Select Authorization as key
        {Bearer <Access Token>} as the value
        U will get the Access Token once u login
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrentUser() user : any) {
        return user;
    }

    // ONLY ADMIN CAN CREATE ANOTHER ADMIN USER
    // Login with super Admin details : [Craetion of Super Admin is in services/auth.service.ts]
    /** Body :
        {
            "email": "admin@gmail.com",
            "password": "123456"
        }
     */
    // U will get the Access Token there, Copy it
    // Now POST : auth/create-admin
    /**
        Header : Select Authorization as key
        {Bearer <Access Token>} as the value
     */
    /**
        Body :
            {
                "email": "admin1@gmail.com",
                "name": "admin1",
                "password": "admin1"
            }
     */
    @Post('create-admin')
    @Roles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    createAdmin(@Body() adminBody : RegisterDto){
        return this.authService.createAdminAccount(adminBody);
    }
}
