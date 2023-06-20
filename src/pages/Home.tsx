import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from "qs";

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import SortPopup, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { setFilters } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';


const Home: React.FC = () => {
  const { categoryId, sort } = useSelector(selectFilter);
  const searchValue = useSelector<any>(state => state.search.value);
  const { items, status } = useSelector(selectPizzaData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = () => {
    const categories = categoryId === 0 ? "" : `category=${categoryId}`;
    const search = searchValue === "" ? "" : `title_like=${searchValue}`;
    dispatch(
      fetchPizzas({ categories, search, sort })
    )
    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;

  //     const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);


  //     dispatch(setFilters({
  //       categoryId: params.categoryId,
  //       sort: sort || sortList[0]
  //     }));

  //     isSearch.current = true;
  //   }
  // }, [])


  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue]);

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId
  //     })

  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort, searchValue])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortPopup />
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