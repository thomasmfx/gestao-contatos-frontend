import { Search } from 'react-feather';

import Button from '../Button/Button';
import './SearchBar.css';

function SearchBar({ placeholder = '', inputName = 'Input', onSearch }) {
  return (
    <form className="searchbar-form" onSubmit={onSearch}>
      <input
        className="searchbar-input"
        placeholder={placeholder}
        name={inputName}
      />
      <Button type={'submit'} isSquare>
        <Search />
      </Button>
    </form>
  );
}

export default SearchBar;
