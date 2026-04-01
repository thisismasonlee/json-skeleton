export type JsonPrimitive = string | number | boolean | null;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

/**
 * Parses an array and returns a deduplicated array of structural skeletons.
 * @param arr Array to process
 * @returns Deduplicated array of skeletons
 */
export function processArray(arr: any[]): any[] {
  if (!arr || arr.length === 0) {
    return [];
  }
  const result: any[] = [];
  const seen = new Set<string>();

  for (const item of arr) {
    const skeleton = walk(item);
    const skeletonStr = JSON.stringify(skeleton);
    if (!seen.has(skeletonStr)) {
      seen.add(skeletonStr);
      result.push(skeleton);
    }
  }

  return result;
}

/**
 * Returns the default structural value for a given data type.
 */
export function getDefaultValue(value: any): any {
  if (value === null || value === undefined) {
    return null;
  }
  if (Array.isArray(value)) {
    return [];
  }
  if (typeof value === 'object') {
    return {};
  }
  if (typeof value === 'number') {
    return 0;
  }
  if (typeof value === 'string') {
    return "";
  }
  if (typeof value === 'boolean') {
    return false;
  }
  return null;
}

/**
 * Recursively walks through JSON data to generate its structural skeleton.
 * @param input The data to walk through
 */
export function walk(input: any): any {
  if (Array.isArray(input)) {
    return processArray(input);
  }
  
  if (input !== null && typeof input === 'object') {
    const skeleton: Record<string, any> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        skeleton[key] = walk(input[key]);
      }
    }
    return skeleton;
  }
  
  return getDefaultValue(input);
}

/**
 * Generates a JSON skeleton from the provided input data.
 * Transforms values to their default states (0, "", false, null) while preserving object and array structures (deduplicating schemas).
 * 
 * @param input The JSON value or complex object to process
 * @returns The generated JSON skeleton representing the structural shape of the input
 */
export function createSkeleton<T = any>(input: T): any {
  return walk(input);
}

export default createSkeleton;
