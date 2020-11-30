import bcrypt from "bcrypt";
import { isNotEmpty } from "class-validator";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { ForeignKeyConstraint } from "../../../utils/foreign-key-constraint";
import { ShoppingCartItem } from "../shopping-cart-item/shopping-cart-item.model";

export enum Role {
    ADMIN = "ADMIN",
    STANDARD = "STANDARD",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password?: string;

    @OneToMany(
        (type) => ShoppingCartItem,
        (shoppingCartItem) => shoppingCartItem.user,
        {
            onUpdate: ForeignKeyConstraint.CASCADE,
            onDelete: ForeignKeyConstraint.NO_ACTION,
        }
    )
    shoppingCartItems: ShoppingCartItem[];

    @Column({
        default: false,
    })
    admin: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password!);
    }
}
