/* eslint-disable prettier/prettier */
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column({nullable: true})
    age: number
}

 