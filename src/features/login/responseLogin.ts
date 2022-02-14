export type QueryResult<TData> = TData | null;
export interface ApiResponse<TData> {
  data: QueryResult<TData>;
  statusCode: number;
  message: string;
}
export interface LoginQueryResult {
  user: {
    citizenId: String | null;
    full_name: string | null;
  };
  token: string | null;
}
export type LoginQueryResponse = ApiResponse<LoginQueryResult>;
