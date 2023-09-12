/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//@Entity({ name: 'users'}) its like to cofigurate a nickname in te database
@Entity()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    username: string;

    @Column()
    password: string;

    @Column({ type: 'datetime', default: () =>  'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column()
    authStrategy: string;
}