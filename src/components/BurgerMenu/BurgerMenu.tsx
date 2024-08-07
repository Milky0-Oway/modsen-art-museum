import { useState, useRef, JSX } from 'react';
import { Link } from 'react-router-dom';

import useOutsideClick from 'utils/useOutsideClick';

import './BurgerMenu.scss';

const BurgerMenu = (): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	useOutsideClick(menuRef, closeMenu);

	return (
		<div className="burger-menu-container">
			<div
				className="burger-icon"
				onClick={toggleMenu}
				role="button"
				tabIndex={0}
				data-testid="burger-menu"
			>
				<div className={`line ${isOpen ? 'open' : ''}`}></div>
				<div className={`line ${isOpen ? 'open' : ''}`}></div>
				<div className={`line ${isOpen ? 'open' : ''}`}></div>
			</div>
			{isOpen && (
				<div className="burger-menu-wrapper" ref={menuRef}>
					<nav className="burger-menu">
						<ul className="burger-menu-list">
							<li className="burger-menu-item">
								<Link to="/" onClick={closeMenu}>
									Home
								</Link>
							</li>
							<li className="burger-menu-item">
								<Link to="/favorites" onClick={closeMenu}>
									Favorites
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			)}
		</div>
	);
};

export default BurgerMenu;
