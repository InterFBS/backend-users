import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserRepository } from "./repositories/create-users/mongo-create-users";
import { CreateUserController } from "./controllers/create-users/create-users";
import { MongoUpdateUserRepository } from "./repositories/update-users/mongo-update-users";
import { UpdateUserController } from "./controllers/update-users/update-users";
import { MongoDeleteUserRespository } from "./repositories/delete-users/mongo-delete-users";
import { DeleteUserController } from "./controllers/delete-users/delete-users";

const main = async () => {
  config();
  const app = express();

  app.use(express.json());
  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUsersController = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersController);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRespository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log("listening on port " + port));
};

main();
