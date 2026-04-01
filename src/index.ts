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

export function createSkeleton(input: any): any {
  return walk(input);
}

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
