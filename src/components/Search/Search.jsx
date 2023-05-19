import React from 'react';
import { CiSearch } from "react-icons/ci";
import { useContexts } from '../../Context/useContext';

import styles from "./Search.index.module.scss";

const Search = () => {
  const { setSearchValue } = useContexts();
  return (
    <div className={styles.search__root}>
      <CiSearch className={styles.search__icon} />
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.search__input}
        placeholder="Поиск пиццы"
      />
    </div>
  )
};

export default Search;