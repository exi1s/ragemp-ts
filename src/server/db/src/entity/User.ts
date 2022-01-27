import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uid: number;

    @Column()
    name: string;

    @Column()
    admin!: number;
}
