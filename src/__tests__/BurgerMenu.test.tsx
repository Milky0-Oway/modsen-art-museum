import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import BurgerMenu from 'components/BurgerMenu/BurgerMenu';

describe('BurgerMenu', () => {
	it('should render the burger icon', () => {
		render(
			<Router>
				<BurgerMenu />
			</Router>,
		);

		const burgerIcon = screen.getByRole('button');
		expect(burgerIcon).toBeInTheDocument();
	});

	it('should open the menu when the burger icon is clicked', () => {
		render(
			<Router>
				<BurgerMenu />
			</Router>,
		);

		const burgerIcon = screen.getByRole('button');
		fireEvent.click(burgerIcon);

		const menu = screen.getByRole('navigation');
		expect(menu).toBeInTheDocument();
	});

	it('should close the menu when clicking outside of it', () => {
		render(
			<Router>
				<BurgerMenu />
			</Router>,
		);

		const burgerIcon = screen.getByRole('button');
		fireEvent.click(burgerIcon);

		const menu = screen.getByRole('navigation');
		expect(menu).toBeInTheDocument();

		fireEvent.mouseDown(document.body);

		expect(menu).not.toBeInTheDocument();
	});

	it('should close the menu when an item is clicked', () => {
		render(
			<Router>
				<BurgerMenu />
			</Router>,
		);

		const burgerIcon = screen.getByRole('button');
		fireEvent.click(burgerIcon);

		const menuItem = screen.getByText(/Home/i);
		fireEvent.click(menuItem);

		const menu = screen.queryByRole('navigation');
		expect(menu).not.toBeInTheDocument();
	});
});
