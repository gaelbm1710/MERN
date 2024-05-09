import React from 'react'
import { SearchResult } from './SearchResult';
import "./SearchResultList.scss";

export function SearchResultList({ results }) {
  if (!Array.isArray(results)) {
    return null;
  }

  return (
    <div className='result-list'>
      {results.map((result, id) => (
        <SearchResult result={result} key={id} />
      ))}
    </div>
  );
}
