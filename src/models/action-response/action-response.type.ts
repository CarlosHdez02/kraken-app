import { paginationType } from "../pagination/pagination.type";

export type SuccessResponseType<T> = {
  success: true;
  data: T;
  message: string;
};
type ErrorResponseType = {
  success: false;
  errorMessage: string;
  code?: string;
  fieldErrors?: Record<string, string[]>;
};

export type PaginatedSuccess<T>={
    success:true,
    data:T[],
    pagination:paginationType,
    message?:string;
}
export type PaginatedResult<T> = PaginatedSuccess<T> | ErrorResponseType;
export type ActionResponseType<T> = SuccessResponseType<T> | ErrorResponseType;

export function isSuccess<T>(
  res: ActionResponseType<T>,
): res is SuccessResponseType<T> {
  return res.success;
}
export function createErrorResponse(
    errorMessage: string,
    options?: { code?: string; fieldErrors?: Record<string, string[]> }
  ): ErrorResponseType {
    return {
      success: false,
      errorMessage,
      code: options?.code,
      fieldErrors: options?.fieldErrors,
    };
  }