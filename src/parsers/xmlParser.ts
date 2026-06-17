import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import logger from "../utils/logger";

export const parseXML = async (filePath: string): Promise<any> => {
  try {
    // Read the file as a string
    const rawData = await fs.readFile(filePath, "utf-8");

    // Convert XML string to a JavaScript Object
    // explicitArray: false stops the library from annoyingly wrapping single items in arrays
    const parsedData = await parseStringPromise(rawData, {
      explicitArray: false,
    });

    logger.info(`Successfully parsed XML file: ${filePath}`);
    return parsedData;
  } catch (error: any) {
    logger.error(`Error parsing XML file at ${filePath}: ${error.message}`);
    throw new Error(`XML Parsing Error: ${error.message}`);
  }
};
