import React from 'react';
import { useContexts } from '../../Context/useContext';

function Categories() {
  // const [activeIndex, setActiveIndex] = React.useState(0);
  const { setActiveIndex, activeIndex } = useContexts();

  const categoriesList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
