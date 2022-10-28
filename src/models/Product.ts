import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OrderProduct } from "./OrderProduct"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    guid!: string

    @Column()
    price!: number

    @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
    ordersProduct: OrderProduct[]
    
}