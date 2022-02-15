export type QueryResult<TData> = TData | null;
export interface ApiResponse<TData> {
  data: QueryResult<TData>;
  statusCode: number;
  message: string;
}
export interface LoginQueryResult {
  user: {
    citizenId: String;
    full_name: string;
  };
  token: string;
}
export type LoginQueryResponse = ApiResponse<LoginQueryResult>;
