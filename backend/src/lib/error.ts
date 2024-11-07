type ErrorWithCode = { code: string };

export function isErrorWithCode(error: unknown): error is ErrorWithCode {
  return typeof (error as ErrorWithCode).code === "string";
}
