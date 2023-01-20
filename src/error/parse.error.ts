export class ParseError extends Error {
  type: string;

  constructor(type: string, message: string, cause?: Error) {
    super(message);

    this.type = type;
    this.name = "[PARSE]";
    this.cause = cause;
  }
}
