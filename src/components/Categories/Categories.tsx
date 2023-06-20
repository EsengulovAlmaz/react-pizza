import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../../redux/filter/slice';

const Categories: React.FC = React.memo(() => {
  const categoryId = useSelector<any>(state => state.filter.categoryId);
  const dispatch = useDispatch();

  const setActiveIndex = (id: number) => {
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
})

export default Categories;
