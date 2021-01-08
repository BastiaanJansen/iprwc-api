import {
    Column,
    CreateDateColumn,
    Entity,
    getRepository,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ForeignKeyConstraint } from "../../../utils/foreign-key-constraint";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";
import { OrderItem } from "./order-item/order-item.model";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.orders)
    user: User;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, {
        cascade: true,
        onDelete: ForeignKeyConstraint.CASCADE,
        onUpdate: ForeignKeyConstraint.CASCADE,
    })
    items: OrderItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
