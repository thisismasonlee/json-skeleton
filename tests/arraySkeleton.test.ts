import { describe, it, expect } from 'vitest';
import { processArray } from '../src/index';

describe('processArray', () => {
  it('1. 基础数组', () => {
    expect(processArray([1, 2, 3])).toEqual([0]);
  });

  it('2. 对象数组', () => {
    expect(processArray([{ a: 1 }, { a: 2 }])).toEqual([{ a: 0 }]);
  });

  it('3. 混合类型去重', () => {
    const input = [1, "a", 1, "b"];
    const expected = [0, ""];
    expect(processArray(input)).toEqual(expected);
  });

  it('4. 空数组', () => {
    expect(processArray([])).toEqual([]);
  });

  it('5. 嵌套数组', () => {
    expect(processArray([[1, 2]])).toEqual([[0]]);
  });

  it('6. 多对象结构去重', () => {
    const input = [{ a: 1 }, { b: 2 }];
    const expected = [{ a: 0 }, { b: 0 }];
    expect(processArray(input)).toEqual(expected);
  });
});
