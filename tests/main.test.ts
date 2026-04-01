import { describe, it, expect } from 'vitest';
import { createSkeleton } from '../src/index';

describe('createSkeleton (main)', () => {
  it('1. 综合复杂 JSON', () => {
    const input = {
      code: 200,
      message: "success",
      data: {
        total: 100,
        items: [
          { id: 1, name: "A", tags: ["a", "b"], status: true },
          { id: 2, name: "B", tags: ["c"], status: false, extra: null }
        ]
      }
    };
    const expected = {
      code: 0,
      message: "",
      data: {
        total: 0,
        items: [
          { id: 0, name: "", tags: [""], status: false },
          { id: 0, name: "", tags: [""], status: false, extra: null }
        ]
      }
    };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('2. 多层嵌套 + 数组 + 混合类型', () => {
    const input = {
      user: {
        profile: {
          avatar: "http://...",
          settings: [
            { key: "theme", value: "dark" },
            { key: "notifications", value: true }
          ]
        },
        logs: [ "login", "click", 123 ]
      }
    };
    const expected = {
      user: {
        profile: {
          avatar: "",
          settings: [
            { key: "", value: "" },
            { key: "", value: false }
          ]
        },
        logs: [ "", 0 ]
      }
    };
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('3. 极端 case（空对象）', () => {
    expect(createSkeleton({})).toEqual({});
  });

  it('4. 大结构（模拟数据）', () => {
    const input = {
      meta: { limit: 10, offset: 0 },
      results: Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        isActive: i % 2 === 0,
        metadata: {
          createdAt: "2023-01-01",
          author: { id: 1, name: "admin" }
        }
      }))
    };
    
    const expected = {
      meta: { limit: 0, offset: 0 },
      results: [
        {
          id: 0,
          isActive: false,
          metadata: {
            createdAt: "",
            author: { id: 0, name: "" }
          }
        }
      ]
    };

    expect(createSkeleton(input)).toEqual(expected);
  });

  it('5. 不可变性', () => {
    const input = {
      data: {
        list: [ { id: 1, name: "test" } ]
      }
    };
    const copy = JSON.parse(JSON.stringify(input));
    
    createSkeleton(input);
    
    expect(input).toEqual(copy);
  });
});
