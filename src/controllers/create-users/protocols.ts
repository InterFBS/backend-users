import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateUserController {
  handle(
    HttpRequest: HttpRequest<CreateUsersParams>
  ): Promise<HttpResponse<User>>;
}

export interface CreateUsersParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUsersParams): Promise<User>;
}
