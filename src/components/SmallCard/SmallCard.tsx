import React, { JSX } from 'react';
import { Link } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary.tsx';

import { Art, URL_IMAGE } from '../../constants/api.ts';
import { useFavorites } from '../../context/FavoritesContext.tsx';
import { isKnown, isPublic } from '../../utils/artHelpers.ts';

import './SmallCard.scss';

import defaultImage from '../../assets/image 2.png';

type SmallCardProps = {
	item: Art;
};

const SmallCard = ({ item }: SmallCardProps): JSX.Element => {
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = favorites.some((el) => el.id === item.id);

	const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = defaultImage;
	};

	const handleClick = () => {
		toggleFavorite(item);
	};

	return (
		<ErrorBoundary>
			<div className="small-card">
				<Link to={`/art/${item.id}`} className="small-card-link">
					<img
						src={URL_IMAGE({ imageId: item.image_id })}
						alt="Small Card Image"
						onError={handleImageError}
					/>
				</Link>
				<div className="small-card-text">
					<div className="small-art-info">
						<p className="small-art-title">{isKnown(item.title)}</p>
						<p className="small-artist-title">{isKnown(item.artist_title)}</p>
						<p className="small-art-status">
							{isPublic(item.is_public_domain)}
						</p>
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

export default React.memo(SmallCard);
