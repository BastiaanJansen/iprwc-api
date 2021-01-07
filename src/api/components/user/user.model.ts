import bcrypt from "bcrypt";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ForeignKeyConstraint } from "../../../utils/foreign-key-constraint";
import { Order } from "./order/order.model";

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

    @Column({
        default: false,
    })
    admin: boolean;

    @OneToMany((type) => Order, (order) => order.user, 
        {
            onUpdate: ForeignKeyConstraint.CASCADE,
            onDelete: ForeignKeyConstraint.NO_ACTION,
        }
    )
    orders: Order[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password!);
    }
}
