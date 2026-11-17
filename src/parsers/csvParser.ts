import fs from "fs";
import logger from "../utils/logger";
import { parse } from "csv-parse";

export const parseCSV = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const results: string[][] = [];

    // Using a ReadStream as required by the course material for optimal data processing
    const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

    // Configure csv-parse to handle quotes (like "Beirut, Lebanon") and trimming automatically
    const parser = parse({
      delimiter: ",",
      trim: true,
      skip_empty_lines: true,
    });

    readStream
      .pipe(parser)
      .on("data", (data: string[]) => {
        results.push(data);
      })
      .on("end", () => {
        logger.info(`Successfully parsed CSV file: ${filePath}`);
        resolve(results);
      })
      .on("error", (error: Error) => {
        logger.error(
          `Error while reading the stream of File ${filePath}, ${error.message}`,
        );
        reject(error);
      });
  });
};
