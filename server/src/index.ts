import "reflect-metadata";
import { DataSource } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [__dirname + "/entities/*.{js,ts}"],
});

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());

    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );

    //oauth로그인 라우팅
    app.use("/oauth", require("./routes/oauth"));

    app.listen(port, "0.0.0.0", () => {
      console.log(`server is now running on ${port}`);
    });
  })
  .catch((error) => console.log(error));
