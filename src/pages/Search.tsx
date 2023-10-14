import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Product, SearchBar } from '../components/SearchBar/SearchBar';
import SearchResultsList from '../components/SearchResultsList/SearchResultsList';
import { useSearchParams } from 'react-router-dom';


export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Product[]>([]);

  const handleSearch = (query: string) => {
    setSearchParams({ q: query });
  };

  return (
    <>
      <Header />
      <div className="search-bar-container">
        <SearchBar setResults={setResults} initialQuery={query} onSearch={handleSearch} />
        <SearchResultsList results={results} />
      </div>
    </>
  );
}
