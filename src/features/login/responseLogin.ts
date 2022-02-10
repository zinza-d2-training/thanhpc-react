export interface ResponseLogin {
  token: string | null | undefined;
  fullname: string | null | undefined;
  statusCode: number;
  message: string;
}
