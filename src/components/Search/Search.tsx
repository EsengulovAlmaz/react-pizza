import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/searchSlice';
import debounce from 'lodash.debounce';

import styles from "./Search.index.module.scss";

const Search: React.FC = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const uptadeSearchValue = React.useCallback(
    debounce((e: string) => {
      dispatch(setSearch(e))
    }, 500),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    uptadeSearchValue(e.target.value);
  };

  return (
    <div className={styles.search__root}>
      <CiSearch className={styles.search__icon} />
      <input
        type="search"
        value={value}
        onChange={onChangeInput}
        className={styles.search__input}
        placeholder="Поиск пиццы"
      />
    </div>
  )
};

export default Search;