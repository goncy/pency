export type ErrorInfo = React.ErrorInfo & {
  origin: string;
};

export default interface ErrorProvider {
  initialize(): void;
  captureError(error: Error, errorInfo: object): void;
}
