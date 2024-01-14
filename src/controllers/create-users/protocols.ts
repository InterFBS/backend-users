import { User } from "../../models/user";

export interface CreateUsersParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUsersParams): Promise<User>;
}
