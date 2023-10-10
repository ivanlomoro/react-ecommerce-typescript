import React from 'react';
import './SearchResultsList.styles.css';
import SearchResult from '../SearchResult/SearchResult';

interface Result {
  id: number;
  name: string;
}

interface Props {
  results: Result[];
}

const SearchResultsList: React.FC<Props> = ({ results }) => {
  return (
    <div className='results-list'>
      {results.map((result, id) => (
        <SearchResult result={result} key={id} />
      ))}
    </div>
  );
};

export default SearchResultsList;
