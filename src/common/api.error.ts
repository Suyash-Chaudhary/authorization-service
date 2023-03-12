export class APIError extends Error {
  Code = 500;
  constructor(message: string, code: number, error = null) {
    super();
    this.message = message + (error != null ? `> ${error.message}` : "");
    this.Code = code ?? 500;
  }
}
