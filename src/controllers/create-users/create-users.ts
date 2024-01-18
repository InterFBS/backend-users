import validator from "validator";
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUsersParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<CreateUsersParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!HttpRequest?.body?.[field as keyof CreateUsersParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(HttpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Email is valid");
      }

      const user = await this.createUserRepository.createUser(
        HttpRequest.body!
      );
      return created(user);
    } catch (error) {
      return serverError();
    }
  }
}
