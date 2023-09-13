/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { PostService } from "./posts.service";
import { PostController } from "./post.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, User]), UsersModule],
        providers: [PostService],
        controllers: [PostController]
})

export class PostModule {}