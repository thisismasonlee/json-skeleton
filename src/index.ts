export function createSkeleton(input: any): any {
  if (Array.isArray(input)) {
    return input.length > 0 ? [createSkeleton(input[0])] : [];
  }
  
  if (input !== null && typeof input === 'object') {
    const skeleton: Record<string, any> = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        skeleton[key] = createSkeleton(input[key]);
      }
    }
    return skeleton;
  }
  
  return typeof input;
}
