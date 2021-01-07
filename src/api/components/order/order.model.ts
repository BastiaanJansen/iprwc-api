import {
    Column,
    CreateDateColumn,
    Entity,
    getRepository,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.orders)
    user: User;

    @ManyToMany((type) => Product, (product) => product.orders, { cascade: true })
    @JoinTable()
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
