export const ErrorCode = {
    DB_ERROR:"DB_ERROR",
    VALIDATION:"VALIDATION",
    NOT_FOUND:"NOT_FOUND",
    SERVER_ERROR:"SERVER_ERROR",
} as const;
export type ErrorCodeType = (typeof ErrorCode )[keyof typeof ErrorCode]