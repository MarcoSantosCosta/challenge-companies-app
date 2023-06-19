export interface ErrorResponse {
  error: string;
  errorsMessages: Array<fieldsErrors>;
}

export interface fieldsErrors {
  field: string;
  message: string;
}
