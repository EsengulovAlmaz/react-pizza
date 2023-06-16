import axios from 'axios';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState({});

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`http://localhost:8080/pizza?id=${id}`);
        setPizza(...data);
      } catch (error) {
        console.log(error.message);
      }
    }())
  }, []);

  console.log(pizza);

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza;