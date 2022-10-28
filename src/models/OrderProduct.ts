import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Order } from "./Order"
import { Product } from "./Product"

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Order, (order) => order.orderProducts)
    order: Order

    @ManyToOne(() => Product, (product) => product.ordersProduct)
    product: Product

    @Column()
    quantity!: number
    
}