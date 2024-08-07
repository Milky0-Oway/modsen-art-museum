import { isKnown, isPublic } from 'utils/artHelpers';

describe('isKnown', () => {
	test('should return "Unknown" for null', () => {
		expect(isKnown(null)).toBe('Unknown');
	});

	test('should return "Unknown" for undefined', () => {
		expect(isKnown(undefined)).toBe('Unknown');
	});

	test('should return "Unknown" for empty array', () => {
		expect(isKnown([])).toBe('Unknown');
	});

	test('should return "Unknown" for empty object', () => {
		expect(isKnown({})).toBe('Unknown');
	});

	test('should return "Unknown" for empty string', () => {
		expect(isKnown('')).toBe('Unknown');
	});

	test('should return "Unknown" for string with only spaces', () => {
		expect(isKnown('   ')).toBe('Unknown');
	});

	test('should return string value for non-empty string', () => {
		expect(isKnown('Art Title')).toBe('Art Title');
	});

	test('should return string value for number', () => {
		expect(isKnown(123)).toBe('123');
	});

	test('should return string value for boolean', () => {
		expect(isKnown(true)).toBe('true');
	});
});

describe('isPublic', () => {
	test('should return "Public" for true', () => {
		expect(isPublic(true)).toBe('Public');
	});

	test('should return "Private" for false', () => {
		expect(isPublic(false)).toBe('Private');
	});

	test('should return "Private" for undefined', () => {
		expect(isPublic(undefined)).toBe('Private');
	});
});
