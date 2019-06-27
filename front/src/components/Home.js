import React from 'react';
import SearchBy from './SearchBy'
import ResultTools from './ResultTools'
import ResultsCards from './ResultCards'
import SearchOptions from './SearchOptions'

export default function Home() {
  return (
    <div class="Home">
      <h1>Searhch for ads</h1>
      <div class="header">
        <SearchBy />
        <SearchOptions />
      </div>
      <div class="ListView">
        <ResultTools />
        <ResultsCards />
      </div>
    </div>
  );
}
