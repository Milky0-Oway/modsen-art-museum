import { JSX, useEffect, useState } from 'react';

import './SmallCardList.scss';
import { Art, getData } from '../../constants/api.ts';
import SmallCard from '../SmallCard/SmallCard.tsx';
import Loader from '../Loader/Loader.tsx';

const SmallCardList = (): JSX.Element => {
  const [data, setData] = useState<Art[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getData(11, 9);
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="small-card-list-wrapper">
      {!loading ? (
        <div className="small-card-list">
          {data.map((art) => (
            <SmallCard item={art} key={art.id} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SmallCardList;
