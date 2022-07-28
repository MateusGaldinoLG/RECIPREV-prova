import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('users')
export class User{

    @PrimaryColumn()
    id: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({name: 'isAdmin'})
    is_admin: boolean

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}