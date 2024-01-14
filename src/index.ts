import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  const app = express();

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersController = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersController);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log("listening on port " + port));
};

main();
