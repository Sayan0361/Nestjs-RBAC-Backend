import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { TokenService } from './token.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly tokenService: TokenService,
        private readonly passwordService: PasswordService,
    ) { }

    private async createUser(
        registerBody: RegisterDto,
        role: UserRole,
    ) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: registerBody.email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await this.passwordService.hash(
            registerBody.password,
        );

        const user = this.usersRepository.create({
            ...registerBody,
            password: hashedPassword,
            role,
        });

        const savedUser = await this.usersRepository.save(user);

        const { password, ...result } = savedUser;

        return {
            user: result,
            message: 'Registration successful',
        };
    }

    async createUserAccount(userBody: RegisterDto) {
        return this.createUser(userBody, UserRole.USER);
    }

    async createAdminAccount(adminBody: RegisterDto) {
        return this.createUser(adminBody, UserRole.ADMIN);
    }

    async login(loginBody: LoginDto) {
        const user = await this.usersRepository.findOne({
            where: { email: loginBody.email },
        });

        const valid = await this.passwordService.compare(
            loginBody.password,
            user?.password,
        );

        if (!user || !valid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = this.tokenService.generateTokens(user);

        const { password, ...result } = user;

        return {
            user: result,
            ...tokens,
        };
    }

    async refreshToken(refreshToken: string) {
        const payload = this.tokenService.verifyRefreshToken(refreshToken);

        const user = await this.usersRepository.findOne({
            where: { id: payload.sub },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid Token');
        }

        return {
            accessToken: this.tokenService.generateAccessToken(user),
        };
    }

    async getUserById(userId : number) {
        const user = await this.usersRepository.findOne({
            where : {
                id : userId
            }
        });

        if(!user) {
            throw new UnauthorizedException(
                `User Not Found!`
            );
        }

        const {
            password,
            ...result
        } = user;

        return result;
    }
}
