/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from 'src/post/post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    username: string;

    @Column({ nullable: false})
    password: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    authStrategy: string;

    @OneToOne( ()=> Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany( () => Post, post => post.author)
    post: Post[]
}