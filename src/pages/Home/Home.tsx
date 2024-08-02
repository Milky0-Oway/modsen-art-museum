import { JSX, useState } from 'react';

import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import SectionName from '../../components/SectionName/SectionName.tsx';
import SearchResultList from '../../components/SearchResultList/SearchResultList.tsx';

import { Art, URL_ART, URL_SEARCH } from '../../constants/api';

import './Home.scss';

const Home = (): JSX.Element => {
  const [searchResult, setSearchResult] = useState<Art[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (searchData: string) => {
    setLoading(true);

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
    } finally {
      setLoading(false);
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
        {searchResult.length > 0 && (
          <section className="search-result">
            <SectionName title="Search result" subtitle="We found" />
            <SearchResultList loading={loading} searchResult={searchResult} />
          </section>
        )}
        <section className="gallery">
          <SectionName title="Our special gallery" subtitle="Topics for you" />
        </section>
        <section className="gallery-small">
          <SectionName title="Other works for you" subtitle="Here some more" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;