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
import { ForeignKeyConstraint } from "../../../../utils/foreign-key-constraint";
import { Product } from "../../product/product.model";
import { User } from "../user.model";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.orders)
    user: User;

    @ManyToMany((type) => Product, (product) => product.id, {
        onUpdate: ForeignKeyConstraint.CASCADE,
        onDelete: ForeignKeyConstraint.NO_ACTION,
    })
    @JoinTable()
    products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
