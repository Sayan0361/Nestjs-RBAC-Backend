import { UserEntity } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// An entity is a class that represents a database table.
@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id!: number; 
    // ! tells TypeScript that these values will be assigned by TypeORM at runtime,
    //  which resolves the strict mode errors while maintaining type safety.

    @Column({ length: 50 })
    title!: string;

    @Column({ type: 'text' })
    content!: string;

    // One post belongs to one user
    // One user can have multiple posts
    @ManyToOne(() => UserEntity, (user) => user.posts)
    authorName!: UserEntity;

    @CreateDateColumn()
    createdDate!: Date;

    @UpdateDateColumn()
    updatedDate!: Date;
}