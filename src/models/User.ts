import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"
import { Order } from "./Order"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    firstName: string 

    @Column()
    lastName: string 

    @Column()
    age: number 

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]
}