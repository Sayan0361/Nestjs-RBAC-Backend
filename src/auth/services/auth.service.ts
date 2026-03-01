import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository : Repository<UserEntity>
    ){}

    private async hashPassword(password: string) : Promise<string> {
        const saltNumber = 10;
        return bcrypt.hash(password, saltNumber);
    }

    async register(registerBody : RegisterDto) {
        const existingUser = await this.usersRepository.findOne({
            where: {
                email: registerBody.email
            }
        });

        if(existingUser) {
            throw new ConflictException('Email already exists. Pls try with a diferent email')
        }
        
        const hashedPassword = await this.hashPassword(registerBody.password);

        const newlyCreatedUser = this.usersRepository.create({
            email: registerBody.email,
            name: registerBody.name,
            password: hashedPassword,
            role: UserRole.USER
        });

        const savedUser = await this.usersRepository.save(newlyCreatedUser);

        //destructure
        const {password, ...result} = savedUser;
        return {
            user: result,
            message: `Registration completed. Pls login to continue`
        }
    }

    async createAdmin(registerBody : RegisterDto) {
        const existingUser = await this.usersRepository.findOne({
            where: {
                email: registerBody.email
            }
        });

        if(existingUser) {
            throw new ConflictException('Email already exists. Pls try with a diferent email')
        }
        
        const hashedPassword = await this.hashPassword(registerBody.password);

        const newlyCreatedAdmin = this.usersRepository.create({
            email: registerBody.email,
            name: registerBody.name,
            password: hashedPassword,
            role: UserRole.ADMIN
        });

        const savedUser = await this.usersRepository.save(newlyCreatedAdmin);

        //destructure
        const {password, ...result} = savedUser;
        return {
            user: result,
            message: `Registration completed for admin. Pls login to continue`
        }
    }
}
