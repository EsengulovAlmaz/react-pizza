import React from 'react';

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useContexts } from '../Context/useContext';


const Home = () => {
  const { isLoading, items } = useContexts();

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