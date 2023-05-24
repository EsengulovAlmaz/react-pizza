import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import qs from "qs";

import Categories from '../components/Categories/Categories';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sort, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';


const Home = () => {
  const [items, setItems] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { categoryId, sort } = useSelector(state => state.filter);
  const searchValue = useSelector(state => state.search.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const fetchPizzas = () => {
    const categories = categoryId === 0 ? "" : `category=${categoryId}`;
    const search = searchValue === "" ? "" : `title_like=${searchValue}`;

    setIsLoading(true);
    axios.get(`http://localhost:8080/pizza?${categories}&_sort=${sort.sortProperty}&_order=asc&${search}`)
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      })
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
      fetchPizzas();
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