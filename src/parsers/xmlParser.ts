import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import logger from "../utils/logger";

export const parseXML = async (
  filePath: string,
): Promise<Record<string, unknown>> => {
  try {
    const rawData = await fs.readFile(filePath, "utf-8");
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
