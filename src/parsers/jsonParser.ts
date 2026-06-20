import fs from "fs/promises";
import logger from "../utils/logger"; // Assuming your Winston logger is here based on the video

export const parseJSON = async (filePath: string): Promise<any> => {
  try {
    const rawData = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(rawData);
    logger.info(`Successfully parsed JSON file: ${filePath}`);
    return parsedData;
  } catch (error: any) {
    logger.error(`Error parsing JSON file at ${filePath}: ${error.message}`);
    throw new Error(`JSON Parsing Error: ${error.message}`);
  }
};
