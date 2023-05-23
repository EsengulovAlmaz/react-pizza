import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/slices/searchSlice';
import debounce from 'lodash.debounce';

import styles from "./Search.index.module.scss";

const Search = () => {
  const [value, setValue] = React.useState();
  const searchValue = useSelector(state => state.search.value);
  const dispatch = useDispatch();

  const uptadeSearchValue = React.useCallback(
    debounce((e) => {
      dispatch(setSearch(e))
    }, 500),
    []
  )

  const onChangeInput = (e) => {
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