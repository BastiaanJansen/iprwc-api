import {
    Check,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ForeignKeyConstraint } from "../../../utils/foreign-key-constraint";
import { Brand } from "../brand/brand.model";

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

    @Column("decimal", { precision: 5, scale: 2 })
    price: number;

    @ManyToOne((type) => Brand, (brand) => brand.id, {
        nullable: false,
    })
    brand: Brand;

    @Column({
        type: "enum",
        enum: NutriScore,
    })
    nutriScore: NutriScore;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
