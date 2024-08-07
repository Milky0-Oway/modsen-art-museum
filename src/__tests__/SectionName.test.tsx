import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SectionName from 'components/SectionName/SectionName';

describe('SectionName component', () => {
	test('renders the title and subtitle correctly', () => {
		const title = 'Test Title';
		const subtitle = 'Test Subtitle';

		render(<SectionName title={title} subtitle={subtitle} />);

		expect(screen.getByText(title)).toBeInTheDocument();

		expect(screen.getByText(subtitle)).toBeInTheDocument();
	});

	test('applies the correct class name', () => {
		const title = 'Another Title';
		const subtitle = 'Another Subtitle';

		render(<SectionName title={title} subtitle={subtitle} />);

		const sectionNameElement = screen.getByText(title).parentElement;
		expect(sectionNameElement).toHaveClass('section-name');
	});
});
