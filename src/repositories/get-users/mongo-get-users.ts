import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firstName: "Mongo",
        lastName: "Database",
        email: "mongo@database.com",
        password: "dbMongo",
      },
    ];
  }
}
