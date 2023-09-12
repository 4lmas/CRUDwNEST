/* eslint-disable prettier/prettier */

import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { User } from 'src/users/user.entity'

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    authorId:number

    @ManyToOne( ()=> User, user => user.post)
    author: User
}