import csv from "csvtojson";
import {parse} from "json2csv";

import {Product} from "~/product/types";

// Convert from CSV string to JSON
export function fromCSV(file: string): Promise<Partial<Product>[]> {
  return new Promise((resolve, reject) => {
    try {
      const result = csv({delimiter: "auto"}).fromString(file);

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// Convert to CSV from JSON
export function toCSV(rows: Record<string, any>[], fields: string[]) {
  return parse(rows, {fields});
}
