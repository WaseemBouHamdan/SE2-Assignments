import fs from "fs";
import logger from "../utils/logger";

export const parseCSV = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const results: string[][] = [];
    // Using a ReadStream as required by the course material for optimal data processing
    const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

    readStream.on("data", (chunk: string) => {
      // Split data into lines and remove empty lines
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      lines.forEach((line) => {
        // Split line into columns, trim spaces, and remove quotes
        const columns = line
          .split(",")
          .map((value) => value.trim().replace(/^"|"$/g, ""));
        results.push(columns);
      });
    });

    readStream.on("end", () => {
      logger.info(`Successfully parsed CSV file: ${filePath}`);
      resolve(results); // Resolve the promise with parsed data when done
    });

    readStream.on("error", (error) => {
      logger.error(
        `Error while reading the stream of File ${filePath}, ${error.message}`,
      );
      reject(error); // Reject the promise if an error occurs
    });
  });
};
