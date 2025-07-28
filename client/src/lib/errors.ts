export const ERROR_MESSAGES = {
  // Network/Connection errors
  NETWORK_ERROR: "Network error occurred",
  FETCH_FAILED: "Failed to fetch data",
  
  // Server errors
  INTERNAL_SERVER_ERROR: "Internal server error",
  UNEXPECTED_ERROR: "An unexpected error occurred",
  
  // Validation errors
  VALIDATION_FAILED: "Validation failed",
  FIX_ERRORS_BELOW: "Please fix the errors below",
  
  // Generic errors
  SOMETHING_WENT_WRONG: "Something went wrong",
  UNKNOWN_ERROR: "Unknown error occurred",
  
  // Success messages
  API_SUCCESS: "Form submitted successfully using API Routes with Zod validation!",
  SERVER_ACTION_SUCCESS: "Form submitted successfully using Server Actions with Zod validation!",
} as const;

export const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR", 
  SERVER_ERROR: "SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export interface AppError {
  code: keyof typeof ERROR_CODES;
  message: string;
  details?: string;
}

export function createError(code: keyof typeof ERROR_CODES, message?: string): AppError {
  return {
    code,
    message: message || ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES] || ERROR_MESSAGES.UNKNOWN_ERROR,
  };
}

export function createNetworkError(): AppError {
  return createError("NETWORK_ERROR");
}

export function createValidationError(): AppError {
  return createError("VALIDATION_ERROR", ERROR_MESSAGES.VALIDATION_FAILED);
}

export function createServerError(): AppError {
  return createError("SERVER_ERROR", ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
} 