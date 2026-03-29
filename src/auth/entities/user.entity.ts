import { PostEntity } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ 
        unique: true 
    })
    email!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    role!: UserRole;

    @OneToMany(() => PostEntity, (post) => post.authorName)
    posts!: PostEntity[];

    @Exclude()
    @CreateDateColumn()
    createdAt!: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt!: Date;
}