import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ForeignKeyConstraint } from "../../../../utils/foreign-key-constraint";
import { Product } from "../../product/product.model";
import { Order } from "../order.model";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @ManyToOne((type) => Product, (product) => product.id)
    product: Product;

    @ManyToOne((type) => Order, (order) => order.items)
    order: Order;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}