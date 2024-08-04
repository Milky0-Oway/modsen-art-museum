import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { Art, URL_IMAGE } from '../../constants/api.ts';
import { useFavorites } from '../../context/FavoritesContext.tsx';

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
          <p className="small-art-title">{item.title ?? 'Unknown'}</p>
          <p className="small-artist-title">{item.artist_title ?? 'Unknown'}</p>
          <p className="small-art-status">
            {item.is_public_domain ? 'Public' : 'Private'}
          </p>
        </div>
        <div
          className={`button-favorite ${isFavorite && 'active'}`}
          onClick={handleClick}
        ></div>
      </div>
    </div>
  );
};

export default SmallCard;
