import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Brand } from "../api/components/brand/brand.model";
import { Product } from "../api/components/product/product.model";
import { ShoppingCartItem } from "../api/components/shopping-cart-item/shopping-cart-item.model";
import { User } from "../api/components/user/user.model";

createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User, Product, Brand, ShoppingCartItem],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: false,
}).then((connection: Connection) => {
    console.log("Database connection succeeded");
});
