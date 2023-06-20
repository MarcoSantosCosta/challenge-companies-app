export interface ErrorResponse {
  error: string;
  errorMessages: Array<fieldsErrors>;
}

export interface fieldsErrors {
  field: string;
  message: string;
}
