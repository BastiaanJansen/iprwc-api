import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ColumnType } from "../../../utils/column-type";
import { Brand } from "../brand/brand.model";
import { Category } from "../category/category.model";
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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
