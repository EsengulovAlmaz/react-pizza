import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

function Categories() {
  const categoryId = useSelector(state => state.filter.categoryId);
  const dispatch = useDispatch();

  const setActiveIndex = (id) => {
    dispatch(setCategoryId(id));
  }

  const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={categoryId === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
