import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`http://localhost:8080/pizza?id=${id}`);
        setPizza(data[0]);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }())
  }, []);


  if (!pizza) {
    return <>Загрузка...</>;
  }

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