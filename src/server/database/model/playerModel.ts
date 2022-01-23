import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Player {
    @PrimaryGeneratedColumn()
    uid!: number; // unique ID

    @Column()
    email!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    // @Column()
    // admin!: number;
    // Различие между администрацией и овнерами
    @Column()
    serverOwner!: boolean;
}