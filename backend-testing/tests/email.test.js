const { validateEmail } = require('../src/email');

describe('validateEmail function', () => {
    test('should validate a simple email address', () => {
        expect(validateEmail('jean@gmail.com')).toBe(true);
    });

    test('should validate an email address with a subdomain', () => {
        expect(validateEmail('jean@justice.gouv.fr')).toBe(true);
    });

    test('should validate an email address with a plus sign', () => {
        expect(validateEmail('jean+spam@gmail.com')).toBe(true);
    });

    test('should validate an email address with an IP address', () => {
        expect(validateEmail('jean@122.31.5.21')).toBe(true);
    });

    test('should invalidate an email address without an "@" symbol', () => {
        expect(validateEmail('jeangmail.com')).toBe(false);
    });

    test('should invalidate an email address without a domain', () => {
        expect(validateEmail('jean@')).toBe(false);
    });

    test('should invalidate an email address with spaces', () => {
        expect(validateEmail('jean @gmail.com')).toBe(false);
    });

    test('should invalidate an email address with multiple "@" symbols', () => {
        expect(validateEmail('jean@@gmail.com')).toBe(false);
    });
});