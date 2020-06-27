import ErrorProvider, {ErrorInfo} from "./provider";

export * from "./providers";
export {ErrorInfo};

export default class ErrorService {
  constructor(private readonly provider: ErrorProvider) {
    if (process.env.NODE_ENV === "production") {
      this.provider.initialize();
    }
  }

  reportError(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.provider.captureError(error, errorInfo);
    }
  }
}
