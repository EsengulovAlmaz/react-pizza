import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = () => {
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { categoryId, sort } = useSelector(state => state.filter);
  const searchValue = useSelector(state => state.search.value);

  React.useEffect(() => {
    const categories = categoryId === 0 ? "" : `category=${categoryId}`;
    const search = searchValue === "" ? "" : `title_like=${searchValue}`;

    setIsLoading(true);
    axios.get(`http://localhost:8080/pizza?${categories}&_sort=${sort.sortProperty}&_order=asc&${search}`)
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      })
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items?.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))
        }
      </div>
    </div>
  )
};


export default Home;