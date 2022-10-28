import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123123",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: ["src/models/*.ts"],
  migrations: [],
  subscribers: [],
})
