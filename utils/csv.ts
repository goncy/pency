import {parse, unparse} from "papaparse";

// Convert from CSV string to JSON
export function fromCSV<T>(csv: File): Promise<T[]> {
  return new Promise((resolve, reject) => {
    parse<T>(csv, {
      header: true,
      delimiter: ";",
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: ({errors, data}) => {
        if (errors.length) {
          return reject(errors);
        } else {
          return resolve(data);
        }
      },
    });
  });
}

// Convert to CSV from JSON
export function toCSV<T>(rows: T[]) {
  return Promise.resolve(unparse(rows, {delimiter: ";"}));
}
