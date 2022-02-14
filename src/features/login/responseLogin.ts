export interface ResponseLogin {
  token: string | null | undefined;
  fullname: string | null | undefined;
  statusCode: number;
  message: string;
}
// export type QueryResult<TData> = TData | null;
// export interface ApiResponse<TData> {
//   data: QueryResult<TData>;
//   statusCode: number;
//   message: string;
// }
// export interface LoginQueryResult {
//   user: {
//     id: number;
//     full_name: string;
//   };
//   token: string;
// }
// export type LoginQueryResponse = ApiResponse<LoginQueryResult>;
