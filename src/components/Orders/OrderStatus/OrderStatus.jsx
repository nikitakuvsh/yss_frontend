// OrderStatus.jsx
import { useParams } from "react-router-dom";
import Clock from "./Clock";
import CheckMark from "./CheckMark";
import TruckDeliveryAnimation from "./Delivery";
import Box from "./Box";
import './OrderStatus.css';
import { useState, useEffect } from "react";
import tShirt from '../../../images/pictures/testTShirt.png';

export default function OrderStatus() {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);

  // Статичные данные для демонстрации
  const ordersStatic = {
    101: { title: 'Готическая футболка', img: tShirt, status: 'В обработке' },
    102: { title: 'Белая толстовка', img: '/images/pictures/testTShirt.png', status: 'Принят' },
    103: { title: 'Чёрные кроссовки', img: '/images/pictures/testTShirt.png', status: 'Отправлен' },
    104: { title: 'Мини-сумка', img: '/images/pictures/testTShirt.png', status: 'Доставлен' },
    105: { title: 'Брюки с карманами', img: '/images/pictures/testTShirt.png', status: 'В обработке' },
  };

  useEffect(() => {
    const key = Number(id); // превращаем строку в число
    if (key && ordersStatic[key]) {
      setOrder(ordersStatic[key]);
    } else {
      setOrder(null);
    }
  }, [id]);
  

  if (!order) return <p style={{ color: "#fff" }}>Заказ не найден</p>;

  // Настройка компонентов по статусу
  let StatusComponent = null;
  let statusText = order.status;
  let statusProps = "";

  switch (order.status.toLowerCase()) {
    case "в обработке":
      StatusComponent = Clock;
      statusText = "В обработке";
      statusProps = "Ваш заказ в обработке. Скоро мы всё проверим и отправим заказ.";
      break;
    case "принят":
      StatusComponent = CheckMark;
      statusText = "Принят";
      statusProps = "Ваш заказ принят. Осталось дождаться отправки!";
      break;
    case "отправлен":
      StatusComponent = TruckDeliveryAnimation;
      statusText = "Отправлен";
      statusProps = "Ваш заказ отправлен. Вы можете отследить его по трек номеру.";
      break;
    case "доставлен":
      StatusComponent = Box;
      statusText = "Доставлен";
      statusProps = "Ваш заказ должен быть у вас. Спасибо за доверие!";
      break;
    default:
      StatusComponent = () => <span>❔</span>;
      statusText = "Неизвестен";
      statusProps = "";
  }

  return (
    <div className="order-status">
      <span className="order-attention" title="Информация о заказе хранится только на вашем устройстве." onClick={() => alert("Информация о заказе хранится только на вашем устройстве. Если вы стёрли память или утеряли доступ к своему устройству, то отобразить этот заказ можно будет только через поддержку.")}>!</span>           

      <div className="status-card">
        <div className="status-sticker">
          <StatusComponent />
        </div>
        <h2 className="status-text">{statusText}</h2>
        <p className="status-props">{statusProps}</p>
        <div className="status-order-key">Заказ №{id}</div>
      </div>

      <button className="details-button" onClick={() => alert("Подробности пока не реализованы")}>
        Показать подробности
      </button>
    </div>
  );
}
