// tests/math.test.js
const { subtract } = require('../src/math');
const { divide } = require('../src/math');


describe('subtract function', () => {
    test('should return 3 when subtracting 5 - 2', () => {
        expect(subtract(5, 2)).toBe(3);
    });

    test('should return -3 when subtracting 2 - 5', () => {
        expect(subtract(2, 5)).toBe(-3);
    });

    test('should return 0 when subtracting 2 - 2', () => {
        expect(subtract(2, 2)).toBe(0);
    });

    test('should work with negative numbers', () => {
        expect(subtract(-5, -2)).toBe(-3);
    });

    test('should work with zero', () => {
        expect(subtract(5, 0)).toBe(5);
        expect(subtract(0, 5)).toBe(-5);
    });

    test('should work with decimal numbers', () => {
        expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
    });
});


describe('divide function', () => {
    test('should return 2.5 when dividing 10 by 4', () => {
        expect(divide(10, 4)).toBe(2.5);
    });
    
    test('should return Infinity when dividing 10 by 0', () => {
        expect(divide(10, 0)).toBe(Infinity);
    });
    
    test('should work with negative numbers', () => {
        expect(divide(-10, 4)).toBe(-2.5);
    });
    
    test('should work with zero', () => {
        expect(divide(10, 0)).toBe(Infinity);
        expect(divide(0, 10)).toBe(0);
    });
    
    test('should work with decimal numbers', () => {
        expect(divide(10.5, 2.2)).toBeCloseTo(4.77);
    });
});

