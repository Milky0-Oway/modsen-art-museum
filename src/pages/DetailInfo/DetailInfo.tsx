import React, { JSX, useEffect, useState } from 'react';

import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import DimensionsText from '../../components/DimensionsText/DimensionsText.tsx';

import { useParams } from 'react-router-dom';
import { Art, getArt, URL_IMAGE } from '../../constants/api.ts';
import { useFavorites } from '../../context/FavoritesContext.tsx';
import { isKnown, isPublic } from '../../utils/artHelpers.ts';

import './DetailInfo.scss';

import defaultImage from '../../assets/image 2.png';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary.tsx';

const DetailInfo = (): JSX.Element => {
	const { id } = useParams();
	const [art, setArt] = useState<Art | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const { favorites, toggleFavorite } = useFavorites();
	const isFavorite = art ? favorites.some((el) => el.id === art.id) : false;

	useEffect(() => {
		const fetchData = async () => {
			if (!id) return;
			setLoading(true);
			try {
				const result = await getArt(id);
				setArt(result.data);
			} catch (error) {
				console.error('Error fetching art data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		event.currentTarget.src = defaultImage;
	};

	const handleClick = () => {
		if (art) {
			toggleFavorite(art);
		}
	};

	return (
		<ErrorBoundary>
			<Header isHomePage={false} />
			<main>
				{!loading ? (
					<div className="art-wrapper">
						<section className="art-picture">
							<img
								src={URL_IMAGE({ imageId: art?.image_id })}
								alt={art ? `${art.title} by ${art.artist_title}` : 'Art Image'}
								onError={handleImageError}
							/>
							<div
								className={`button-favorite ${isFavorite ? 'active' : ''}`}
								onClick={handleClick}
							></div>
						</section>
						<section className="art-description">
							<p className="text-title">{isKnown(art?.title)}</p>
							<p className="text-artist">{isKnown(art?.artist_title)}</p>
							<p className="text-date">{`${isKnown(art?.date_start)}–${isKnown(art?.date_end)}`}</p>
							<div className="overview">
								<p className="text-title">Overview</p>
								<p className="text">
									<span className="primary">Artist nationality: </span>
									{isKnown(art?.place_of_origin)}
								</p>
								<DimensionsText dimensions={art?.dimensions} />
								<p className="text">
									<span className="primary">Credit Line: </span>
									{isKnown(art?.credit_line)}
								</p>
								<p className="text">
									<span className="primary">Repository: </span>Metropolitan
									Museum of Art, New York, NY
								</p>
								<p className="text">{isPublic(art?.is_public_domain)}</p>
							</div>
						</section>
					</div>
				) : (
					<Loader />
				)}
			</main>
			<Footer />
		</ErrorBoundary>
	);
};

export default DetailInfo;
