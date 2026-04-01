import { describe, it, expect } from 'vitest';
import { createSkeleton } from './index';

describe('createSkeleton', () => {
  it('should generate skeleton for a simple object', () => {
    const input = {
      name: 'John',
      age: 30,
      isActive: true,
      data: null
    };
    
    const expected = {
      name: 'string',
      age: 'number',
      isActive: 'boolean',
      data: 'object'
    };
    
    expect(createSkeleton(input)).toEqual(expected);
  });

  it('should generate skeleton for arrays', () => {
    const input = {
      tags: ['a', 'b', 'c'],
      users: [{ id: 1 }, { id: 2 }]
    };
    
    const expected = {
      tags: ['string'],
      users: [{ id: 'number' }]
    };
    
    expect(createSkeleton(input)).toEqual(expected);
  });
});
