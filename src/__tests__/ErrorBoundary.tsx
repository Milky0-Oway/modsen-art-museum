import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const ProblematicComponent = () => {
	throw new Error('I crashed!');
};

describe('ErrorBoundary', () => {
	it('should render its children when there is no error', () => {
		const { container } = render(
			<ErrorBoundary>
				<h1>All is well</h1>
			</ErrorBoundary>,
		);

		expect(screen.getByText('All is well')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});

	it('should catch an error and render fallback UI', () => {
		const { container } = render(
			<ErrorBoundary>
				<ProblematicComponent />
			</ErrorBoundary>,
		);

		expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
		expect(container).toMatchSnapshot();
	});
});
