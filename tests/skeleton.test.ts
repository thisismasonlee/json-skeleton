import { describe, it, expect } from 'vitest';
import { createSkeleton } from '../src/index';

describe('createSkeleton', () => {
  it('1. 基础对象', () => {
    const input = { a: 1, b: "x", c: true };
    const expected = { a: 0, b: "", c: false };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('2. 嵌套对象', () => {
    const input = { a: { b: 2 } };
    const expected = { a: { b: 0 } };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('3. null / undefined', () => {
    const input = { a: null, b: undefined };
    const expected = { a: null, b: null };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('4. 数组（单元素）', () => {
    const input = { a: [1, 2, 3] };
    const expected = { a: [0] };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('5. 数组（对象）', () => {
    const input = { a: [{ x: 1 }, { x: 2 }] };
    const expected = { a: [{ x: 0 }] };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('6. 空数组', () => {
    const input = { a: [] };
    const expected = { a: [] };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('7. 多类型数组去重结构', () => {
    const input = { a: [1, "x", 1, "y"] };
    const expected = { a: [0, ""] };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('8. 深层嵌套数组', () => {
    const input = { a: [{ b: [1, 2] }] };
    const expected = { a: [{ b: [0] }] };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('9. 非对象输入', () => {
    expect(createSkeleton(123)).toBe(0);
    expect(createSkeleton("abc")).toBe("");
  });

  it('10. 不可变性（不修改原数据）', () => {
    const input = { a: 1, b: { c: [1, 2] } };
    const inputCopy = JSON.parse(JSON.stringify(input));
    
    createSkeleton(input);
    
    expect(input).toEqual(inputCopy);
  });
});
