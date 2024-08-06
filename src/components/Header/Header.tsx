import { JSX, memo } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

import museumLogo from '../../assets/museum-logo 2.svg';
import bookmarkIcon from '../../assets/bookmark.png';
import homeIcon from '../../assets/home.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu.tsx';

type HeaderProps = {
	isHomePage?: boolean;
};

const Header = memo(({ isHomePage = true }: HeaderProps): JSX.Element => {
	return (
		<header>
			<div className="header-wrapper">
				<img src={museumLogo} alt="Museum Logo" />
				<nav className="menu">
					{!isHomePage && (
						<Link to="/" className="nav-link">
							<img
								src={homeIcon}
								alt="Home Icon"
								style={{ height: '24px', width: '24px' }}
							/>
							<p>Home</p>
						</Link>
					)}
					<Link to="/favorites" className="nav-link">
						<img
							src={bookmarkIcon}
							alt="Bookmark Icon"
							style={{ height: '24px', width: '24px' }}
						/>
						<p>Your favorites</p>
					</Link>
					<BurgerMenu />
				</nav>
			</div>
		</header>
	);
});

Header.displayName = 'Header';

export default Header;
