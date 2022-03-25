export type QueryResult<TData> = TData | null;
export interface ApiResponse<TData> {
  data: QueryResult<TData>;
  statusCode: number;
  message: string;
}
export interface LoginQueryResult {
  payload: {
    citizen_id: String;
    full_name: string;
  };
  accessToken: string;
}
export type LoginQueryResponse = ApiResponse<LoginQueryResult>;
