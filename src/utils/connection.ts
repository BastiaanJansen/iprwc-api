import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { Employee } from "../api/components/employee/employee.model";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import * as path from "path";
import { Content } from "../api/components/content/content.model";
import { Tree } from "../api/components/tree/tree.model";
import { Node } from "../api/components/node/node.model";
import { QuestionInfo } from "../api/components/tree/questions/question-info/question-info";

createConnection({
    type: "mysql",
    host: "db",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [
        // path.join(__dirname, "..", "api", "components", "**", "*", ".model.ts"),
        Employee,
        Node,
        Content,
        Tree,
        QuestionInfo,
    ],
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true,
    logging: false,
}).then((connection: Connection) => {});
