import React from 'react';
import "./SearchResult.styles.css";
import { Link } from 'react-router-dom';

interface SearchResultProps {
  result: {
    id: number;
    name: string;
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <Link to={`/product/${result.id}`} className='search-result'>
      {result.name}
    </Link>
  );
}

export default SearchResult;
