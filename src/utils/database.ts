import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Brand } from "../api/components/brand/brand.model";
import { Category } from "../api/components/category/category.model";
import { Tag } from "../api/components/tag/tag.model";
import { Product } from "../api/components/product/product.model";
import { User } from "../api/components/user/user.model";
import { Order } from "../api/components/user/order/order.model";

createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User, Product, Brand, Category, Tag, Order],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: false,
}).then((connection: Connection) => {
    console.log("Database connection succeeded");
});
