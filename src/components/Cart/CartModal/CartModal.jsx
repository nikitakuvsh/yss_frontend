import './CartModal.css';
import { useState } from 'react';

export default function CartModal({ onClose, totalPrice }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    delivery: 'CDEK'
  });

  const API = process.env.REACT_APP_BACKEND_API;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cartRaw = localStorage.getItem("cart");
    if (!cartRaw) {
      alert("Корзина пуста!");
      return;
    }

    const cart = JSON.parse(cartRaw);

    // Формируем массив объектов для backend
    // 2. Формируем массив items для backend
    const items = cart.map(item => `${item.title} ${item.size}`);

    const orderData = {
      name: formData.fullName,
      mail: formData.email,
      phone: formData.phone,
      address: formData.address,
      delivery_method: formData.delivery,
      items: items, // <- массив объектов, не строк
      total_summ: totalPrice
    };

    console.log("ORDER DATA:", orderData);

    try {
      const response = await fetch(`${API}/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert("✅ Заказ успешно создан!");
        localStorage.removeItem("cart");
        onClose();
      } else {
        const errorText = await response.text();
        alert("❌ Ошибка при создании заказа: " + errorText);
      }
    } catch (err) {
      alert("❌ Ошибка сети: " + err.message);
    }
  };

  return (
    <div className="cart-modal__overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <form className="cart-modal__content" onSubmit={handleSubmit}>
          <h2 className="cart-modal__title">Оформление заказа</h2>

          <input type="text" name="fullName" placeholder="ФИО получателя" value={formData.fullName} onChange={handleChange} required className="cart-modal__input nowrap" />
          <input type="email" name="email" placeholder="Электронная почта" value={formData.email} onChange={handleChange} required className="cart-modal__input nowrap" />
          <input type="tel" name="phone" placeholder="Номер телефона" value={formData.phone} onChange={handleChange} required className="cart-modal__input nowrap" />
          <input type="text" name="address" placeholder="Адрес доставки" value={formData.address} onChange={handleChange} required className="cart-modal__input nowrap" />

          <select name="delivery" value={formData.delivery} onChange={handleChange} className="cart-modal__select nowrap">
            <option value="CDEK">СДЕК</option>
          </select>

          <div className='cart-modal__descr nowrap'>
            <span className='cart-modal__descr-text'>Итоговая сумма</span>
            <span className='cart-modal__descr-text descr--price'>{totalPrice}Р</span>
          </div>

          <div className="cart-modal__buttons">
            <button type="button" className="cart-modal__button button--cancel" onClick={onClose}>Отмена</button>
            <button type="submit" className="cart-modal__button button--submit">Подтвердить</button>
          </div>
        </form>
      </div>
    </div>
  );
}