import { JSX, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Art, URL_IMAGE } from '../../constants/api.ts';
import { useFavorites } from '../../context/FavoritesContext.tsx';
import { isKnown, isPublic } from '../../utils/artHelpers.ts';

import './Card.scss';

import defaultImage from '../../assets/image 2.png';
import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';

type CardProps = {
	item: Art;
};

const Card = ({ item }: CardProps): JSX.Element => {
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = useMemo(
		() => favorites.some((el) => el.id === item.id),
		[favorites, item.id],
	);

	const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = defaultImage;
	};

	const handleClick = () => {
		toggleFavorite(item);
	};

	return (
		<ErrorBoundary>
			<div className="card">
				<Link to={`/art/${item.id}`} className="card-link">
					<img
						src={URL_IMAGE({ imageId: item.image_id })}
						alt="Card Image"
						onError={handleImageError}
					/>
				</Link>
				<div className="card-text">
					<div className="art-info">
						<p className="art-title">{isKnown(item.title)}</p>
						<p className="artist-title">{isKnown(item.artist_title)}</p>
						<p className="art-status">{isPublic(item.is_public_domain)}</p>
					</div>
					<div
						className={`button-favorite ${isFavorite && 'active'}`}
						onClick={handleClick}
					></div>
				</div>
			</div>
		</ErrorBoundary>
	);
};

export default React.memo(Card);
