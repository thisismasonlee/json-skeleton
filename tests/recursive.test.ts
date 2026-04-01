import { describe, it, expect } from 'vitest';
import { walk } from '../src/index';

describe('walk', () => {
  it('1. 深层嵌套对象', () => {
    const input = { a: { b: { c: { d: 1 } } } };
    const expected = { a: { b: { c: { d: 0 } } } };
    expect(walk(input)).toEqual(expected);
  });

  it('2. 对象+数组混合', () => {
    const input = { a: 1, b: [{ c: "test" }, { c: "other" }] };
    const expected = { a: 0, b: [{ c: "" }] };
    expect(walk(input)).toEqual(expected);
  });

  it('3. 多层数组嵌套', () => {
    const input = [[[{ a: true }]], [[{ a: false }]]];
    const expected = [[[{ a: false }]]];
    expect(walk(input)).toEqual(expected);
  });

  it('4. 边界：null / undefined', () => {
    expect(walk(null)).toBeNull();
    expect(walk(undefined)).toBeNull();
  });

  it('5. 不可变性', () => {
    const input = { a: [{ b: 1 }] };
    const inputCopy = JSON.parse(JSON.stringify(input));
    
    walk(input);
    
    expect(input).toEqual(inputCopy);
  });
});
