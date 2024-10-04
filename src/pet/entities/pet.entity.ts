import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'


@Entity()
@Unique(['owner_name'])
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pet_name: string;

    @Column()
    owner_name: string;


}