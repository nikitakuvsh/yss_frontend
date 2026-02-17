import './CartModal.css';
import { useState } from 'react';

export default function CartModal({ onClose, totalPrice }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    delivery: 'courier'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ORDER DATA:', formData);
  };

  return (
    <div className="cart-modal__overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <form className="cart-modal__content" onSubmit={handleSubmit}>
          <h2 className="cart-modal__title">Оформление заказа</h2>

          <input
            type="text"
            name="fullName"
            placeholder="ФИО получателя"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Электронная почта"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Адрес доставки"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <select
            name="delivery"
            value={formData.delivery}
            onChange={handleChange}
          >
            <option value="CDEK">СДЕК</option>
          </select>

          <div className='cart-modal__descr'>
            <span className='cart-modal__descr-text'>Итоговая сумма</span>
            <span className='cart-modal__descr-text descr--price'>{totalPrice}Р</span>
          </div>

          <div className="cart-modal__buttons">
            <button
              type="button"
              className="cart-modal__button button--cancel"
              onClick={onClose}
            >
              Отмена
            </button>

            <button
              type="submit"
              className="cart-modal__button button--submit"
            >
              Подтвердить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
