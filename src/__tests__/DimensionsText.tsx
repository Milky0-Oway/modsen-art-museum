import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
	parseDimensions,
	DimensionPart,
} from 'components/DimensionsText/DimensionsText';

describe('parseDimensions', () => {
	it('should return an empty array if dimensions is undefined', () => {
		expect(parseDimensions(undefined)).toEqual([]);
	});

	it('should parse dimensions correctly', () => {
		const dimensions = 'Height: 20 cm; Width: 10 cm; Depth: 5 cm';
		const expectedOutput = [
			{ title: 'Height', value: '20 cm' },
			{ title: 'Width', value: '10 cm' },
			{ title: 'Depth', value: '5 cm' },
		];
		expect(parseDimensions(dimensions)).toEqual(expectedOutput);
	});

	it('should trim whitespace from titles and values', () => {
		const dimensions = ' Height : 20 cm ; Width : 10 cm ; Depth : 5 cm ';
		const expectedOutput = [
			{ title: 'Height', value: '20 cm' },
			{ title: 'Width', value: '10 cm' },
			{ title: 'Depth', value: '5 cm' },
		];
		expect(parseDimensions(dimensions)).toEqual(expectedOutput);
	});
});

const mockPart = { title: 'Height', value: '20 cm' };
const mockEmptyPart = { title: 'Unknown', value: '' };

describe('DimensionPart', () => {
	it('should not render a semicolon if it is the last part', () => {
		render(<DimensionPart part={mockPart} isLast={true} />);
		expect(screen.getByText('Height:')).toBeInTheDocument();
		expect(screen.getByText('20 cm')).toBeInTheDocument();
		expect(screen.queryByText(';')).not.toBeInTheDocument();
	});

	it('should render a part without value correctly', () => {
		render(<DimensionPart part={mockEmptyPart} isLast={false} />);
		expect(screen.getByText('Unknown')).toBeInTheDocument();
		expect(screen.queryByText(';')).not.toBeInTheDocument();
	});
});
