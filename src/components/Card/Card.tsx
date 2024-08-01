import { JSX } from 'react';

import { Art, URL_IMAGE } from "../../constants/api.ts";

import './Card.scss'
import {Link} from "react-router-dom";

type CardProps = {
    item: Art
}

const Card = ({ item }: CardProps): JSX.Element => {
    return (
        <div className='card'>
            <Link to={`/art/${item.id}`} className='card-link'>
                <img src={URL_IMAGE({imageId: item.image_id})} alt='Card Image'/>
            </Link>
            <div className='card-text'>
                <div className='art-info'>
                    <p className='art-title'>{item.title ?? 'Unknown'}</p>
                    <p className='artist-title'>{item.artist_title ?? 'Unknown'}</p>
                    <p className='art-status'>{item.is_public_domain ? 'Public' : 'Private'}</p>
                </div>
                <div className='button-favorite'></div>
            </div>
        </div>
    );
};

export default Card;