import { describe, it, expect } from 'vitest';
import { products } from '../data/products';

describe('products data', () => {
  it('contains exactly 21 products', () => {
    expect(products).toHaveLength(21);
  });

  it('every product has required fields', () => {
    const requiredFields = [
      'id',
      'name',
      'description',
      'subdomain',
      'ports',
      'viral',
      'server',
      'github',
      'category',
    ];
    products.forEach((p) => {
      requiredFields.forEach((field) => {
        expect(p).toHaveProperty(field);
      });
    });
  });

  it('all product IDs are unique', () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all subdomains end with .doaide.com', () => {
    products.forEach((p) => {
      expect(p.subdomain).toMatch(/\.doaide\.com$/);
    });
  });

  it('has correct server distribution', () => {
    const server1 = products.filter((p) => p.server === '89.167.8.178');
    const server2 = products.filter((p) => p.server === '204.168.241.124');
    expect(server1).toHaveLength(18);
    expect(server2).toHaveLength(3);
  });

  it('viral count matches expected value', () => {
    const viralProducts = products.filter((p) => p.viral);
    expect(viralProducts.length).toBeGreaterThanOrEqual(11);
  });

  it('categories are either Core or New', () => {
    products.forEach((p) => {
      expect(['Core', 'New']).toContain(p.category);
    });
  });

  it('ports array contains only numbers', () => {
    products.forEach((p) => {
      p.ports.forEach((port) => {
        expect(typeof port).toBe('number');
        expect(port).toBeGreaterThan(0);
      });
    });
  });

  it('github repos follow r2st/ pattern', () => {
    products.forEach((p) => {
      expect(p.github).toMatch(/^r2st\//);
    });
  });

  it('contains known core products', () => {
    const coreNames = products
      .filter((p) => p.category === 'Core')
      .map((p) => p.name);
    expect(coreNames).toContain('DoAide Desk');
    expect(coreNames).toContain('DoAide Med');
    expect(coreNames).toContain('DoAide GST');
    expect(coreNames).toContain('DoAide Contracts');
  });
});
