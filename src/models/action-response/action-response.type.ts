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
export type ActionResponseType<T> = SuccessResponseType<T> | ErrorResponseType;

export function isSuccess<T>(
  res: ActionResponseType<T>,
): res is SuccessResponseType<T> {
  return res.success;
}
