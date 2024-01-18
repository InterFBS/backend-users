import { HttpResponse, HttpStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.BADREQUEST,
    body: message,
  };
};

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVERERROR,
    body: "Something went wrong",
  };
};
