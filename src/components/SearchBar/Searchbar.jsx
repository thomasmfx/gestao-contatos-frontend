import { Search } from 'react-feather';
import { useState } from 'react';

import './SearchBar.css';
import Button from '../Button/Button';
import Input from '../Input/Input';

function SearchBar({ placeholder = '', onSearch }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="searchbar-form">
      <Input
        onChange={(e) => setValue(e.target.value)}
        inputName={'Barra de pesquisa'}
        className="searchbar-input"
        placeholder={placeholder}
        autoComplete="off"
        value={value}
      />
      <Button onClick={() => onSearch(value)} type={'submit'} isSquare>
        <Search />
      </Button>
    </form>
  );
}

export default SearchBar;
