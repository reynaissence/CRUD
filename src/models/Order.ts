import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { OrderProduct } from "./OrderProduct"
import { User } from "./User"

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id!: number

    @Column() 
    guid!: string

    @Column()
    creation_date!: Date

    @ManyToOne(() => User, (user) => user.orders)
    user: User

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
    orderProducts: OrderProduct[]
}