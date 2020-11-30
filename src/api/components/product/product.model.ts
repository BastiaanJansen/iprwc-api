import {
    Check,
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
import { ColumnType } from "../../../utils/column-type";
import { ForeignKeyConstraint } from "../../../utils/foreign-key-constraint";
import { Brand } from "../brand/brand.model";
import { Category } from "../category/category.model";
import { ShoppingCartItem } from "../user/shopping-cart-item/shopping-cart-item.model";
import { Tag } from "../tag/tag.model";

export enum NutriScore {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column(ColumnType.TEXT)
    description: string;

    @Column(ColumnType.DECIMAL, { precision: 5, scale: 2 })
    price: number;

    @ManyToOne((type) => Brand, (brand) => brand.id, {
        nullable: false,
    })
    brand: Brand;

    @Column({
        type: ColumnType.ENUM,
        enum: NutriScore,
    })
    nutriScore: NutriScore;

    @Column()
    weight: string;

    @ManyToOne((type) => Category, (category) => category.id)
    category: Category;

    @ManyToMany((type) => Tag, (tag) => tag.products, { cascade: true })
    @JoinTable()
    tags: Tag[];

    @Column()
    image: string;

    @Column(ColumnType.DECIMAL, { precision: 13, scale: 0 })
    barcode: string;

    @OneToMany(
        (type) => ShoppingCartItem,
        (shoppingCartItem) => shoppingCartItem.product,
        {
            onUpdate: ForeignKeyConstraint.CASCADE,
            onDelete: ForeignKeyConstraint.NO_ACTION,
        }
    )
    shoppingCartItems: ShoppingCartItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
