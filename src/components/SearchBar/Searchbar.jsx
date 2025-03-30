import { Search } from 'react-feather';
import { useState } from 'react';

import './SearchBar.css';
import Button from '../Button/Button';

function SearchBar({ placeholder = '', inputName = 'Input', onSearch }) {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch('', inputValue);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="searchbar-form">
      <input
        onChange={(e) => setInputValue(e.target.value)}
        className="searchbar-input"
        placeholder={placeholder}
        value={inputValue}
        autoComplete="off"
        name={inputName}
      />
      <Button type={'submit'} isSquare>
        <Search />
      </Button>
    </form>
  );
}

export default SearchBar;
