// Orders.jsx
import './Orders.css';
import sampleTShirt from '../../images/pictures/testTShirt.png';
import { useState } from 'react';
import { UNSAFE_NavigationContext, useNavigate } from 'react-router-dom';

export default function Orders() {
  // Пример заказов
  const [orders, setOrders] = useState([
    { id: 101, name: 'Готическая футболка', qty: 1, img: sampleTShirt },
    { id: 102, name: 'Белая толстовка', qty: 1, img: sampleTShirt },
    { id: 103, name: 'Чёрные кроссовки', qty: 1, img: sampleTShirt },
    { id: 104, name: 'Мини-сумка', qty: 1, img: sampleTShirt },
    { id: 105, name: 'Брюки с карманами', qty: 1, img: sampleTShirt },
  ]);

  const navigate = useNavigate();

  const handleClick = (id) => navigate(`/order/${id}`);

  return (
    <main className='orders'>
      <div className='orders__content'>
        <h2 className='orders__title'>заказы</h2>

        {orders.length === 0 ? (
          <p className='orders__empty'>Заказов пока нет</p>
        ) : (
          <div className='orders__table'>
            {orders.map(order => (
              <div key={order.id} className='orders__row' onClick={() => handleClick(order.id)}>
                <img className='orders__image' src={order.img} alt={order.name} />
                <div className='orders__info'>
                  <div className='orders__id'>#{order.id}</div>
                  <h4 className='orders__name'>{order.name}</h4>
                </div>
                <div className='orders__qty'>Кол-во: {order.qty}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
