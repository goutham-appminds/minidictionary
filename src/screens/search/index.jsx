import React, { useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import ShowResults from '../components/show-results';

import './styles.css';

function Search() {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const [meanings, setMeanings] = useState();
  const [loading, setLoading] = useState(false);

  // GET API For search data
  const searchWord = async () => {
    if (word === '') {
      setError({
        title: 'Please enter the word to search',
      });
      return false;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      setMeanings(data);
      setError();
    } catch (errorDetails) {
      setMeanings();
      const { response: { data = {} } } = errorDetails;
      setError({
        title: 'Somthing went wrong, please try after sometime',
        ...data,
      });
    }
    setLoading(false);
  };

  // handling the input field
  const handleText = debounce((e) => {
    setWord(e.target.value);
  }, 500);

  return (
    <div className="page">
      <h1>MINI DICTIONARY</h1>
      <input
        className="text"
        placeholder="search here.."
        onChange={handleText}
      />
      <button type="button" className="btn" onClick={searchWord} disabled={loading} data-testid="search">
        {loading ? 'Loading ...' : 'Search'}
      </button>

      {
        Boolean(error) && (
          <div className="alert alert-danger">
            {error.message ? error.message : error.title}
          </div>
        )
      }

      {
       meanings && (
       <ShowResults meanings={meanings} />
       )
      }
    </div>
  );
}

export default Search;
