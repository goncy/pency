import ErrorProvider, {ErrorInfo} from "./provider";

export * from "./providers";
export type {ErrorInfo};

export default class ErrorService<T extends ErrorProvider = ErrorProvider> {
  private readonly provider: T;

  constructor(provider: new () => T) {
    if (process.env.NODE_ENV === "production") {
      this.provider = new provider();
      this.provider.initialize();
    }
  }

  reportError(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.provider.captureError(error, errorInfo);
    }
  }
}
