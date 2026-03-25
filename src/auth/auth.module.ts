import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { PasswordService } from './services/password.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles-guard';

@Module({
    imports: [
        // this will register the UserEntity (injection) so that we can use it
        // this will be available in the current scope
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule,
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokenService,
        PasswordService,
        JwtStrategy,
        RolesGuard
    ],
    exports : [AuthService, RolesGuard]
})
export class AuthModule { }
