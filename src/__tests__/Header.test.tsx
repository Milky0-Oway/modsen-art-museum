import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from 'components/Header/Header.tsx';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
	it('should render nav links when isHomePage is false', () => {
		render(
			<MemoryRouter>
				<Header isHomePage={false} />
			</MemoryRouter>,
		);

		expect(screen.getByText('Home')).toBeInTheDocument();

		expect(screen.getByText('Your favorites')).toBeInTheDocument();

		expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
	});

	it('should not render Home link when isHomePage is true', () => {
		render(
			<MemoryRouter>
				<Header isHomePage={true} />
			</MemoryRouter>,
		);

		expect(screen.queryByText('Home')).not.toBeInTheDocument();

		expect(screen.getByText('Your favorites')).toBeInTheDocument();

		expect(screen.getByTestId('burger-menu')).toBeInTheDocument();
	});
});
