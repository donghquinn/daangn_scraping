export class CommonError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.type = type;
    this.name = "[COMMON]";
    this.cause = cause;
  }
}
