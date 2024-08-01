import { JSX, useState } from 'react';

import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';

import { Art, URL_ART, URL_SEARCH } from '../../constants/api';

import './Home.scss';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';

const Home = (): JSX.Element => {
  const [searchResult, setSearchResult] = useState<Art[]>([]);

  const handleSearch = async (searchData: string) => {
    try {
      const response = await fetch(URL_SEARCH({ searchData }));
      const result = await response.json();
      const arts = result.data;

      const detailedArts = await Promise.all(
        arts.map(async (art: { id: number }) => {
          const detailResponse = await fetch(URL_ART({ artId: art.id }));
          const detailResult = await detailResponse.json();
          return detailResult.data;
        }),
      );

      setSearchResult(detailedArts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section className="search">
          <h1>
            Let's Find Some <span className="text-primary">Art</span> Here!
          </h1>
          <SearchBar onSearch={handleSearch} />
        </section>
        {searchResult.length > 0}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
