import { Search } from 'react-feather';
import { FormEvent, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './SearchBar.css';

type SearchBarProps = {
  placeholder?: string;
  // Does not have the type "ID" because it doesn't semantically represent an actual ID, it's rather a wild card for a search param
  onSearch: (value?: number | string) => void;
}

function SearchBar({ placeholder = '', onSearch }: Readonly<SearchBarProps> ) {
  const [value, setValue] = useState<string>('');

  function handleSubmit(e: FormEvent<HTMLFormElement> ) {
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
        value={value}
      />
      <Button onClick={onSearch} type={'submit'} isSquare>
        <Search />
      </Button>
    </form>
  );
}

export default SearchBar;
