export class ServeyError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.type = type;
    this.name = "[ADMIN]";
    this.cause = cause;
  }
}
