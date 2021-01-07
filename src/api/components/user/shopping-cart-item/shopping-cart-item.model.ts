import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ColumnType } from "../../../../utils/column-type";
import { Product } from "../../product/product.model";
import { User } from "../user.model";

// @Entity()
// export class ShoppingCartItem {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne((type) => User, (user) => user.shoppingCartItems)
//     user: User;

//     @ManyToOne((type) => Product, (product) => product.shoppingCartItems)
//     product: Product;

//     @Column(ColumnType.INT)
//     quantity: number;

//     @CreateDateColumn()
//     createdAt: Date;

//     @UpdateDateColumn()
//     updatedAt: Date;
//     item: Promise<Product | undefined>;
// }
