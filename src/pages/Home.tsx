import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from "qs";

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';


const Home: React.FC = () => {
  const { categoryId, sort } = useSelector(selectFilter);
  const searchValue = useSelector<any>(state => state.search.value);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = () => {
    const categories = categoryId === 0 ? "" : `category=${categoryId}`;
    const search = searchValue === "" ? "" : `title_like=${searchValue}`;

    dispatch(
      //@ts-ignore 
      fetchPizzas({ categories, search, sort })
    )
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort
      }))
      isSearch.current = true;
    }
  }, [])


  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId
      })

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          status === "error"
          && <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>К сожалению, не удалось получить пиццы</p>
          </div>
        }
        {
          status === "loading"
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items?.map((obj: any) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
              />
            ))
        }
      </div>
    </div>
  )
};


export default Home;