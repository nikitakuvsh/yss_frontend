import './Cart.css';
import { useState } from 'react';
import sampleTShirt from '../../images/pictures/testTShirt.png';

export default function Cart() {
    // Инициализируем товары
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Футболка Bozy Brand', size: 'M', price: 3500, qty: 1, img: sampleTShirt },
        { id: 2, name: 'Футболка Cool Brand', size: 'L', price: 4200, qty: 2, img: sampleTShirt },
    ]);

    // Увеличение количества
    const incrementQty = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
        ));
    };

    // Уменьшение количества
    const decrementQty = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item
        ));
    };

    // Удаление товара
    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Общая сумма
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <main className='cart'>
            <div className='cart__content'>
                <h2 className='cart__title'>корзина</h2>

                {cartItems.length === 0 ? (
                    <p className='cart__empty'>Корзина пуста</p>
                ) : (
                    <div className='cart__table'>
                        {cartItems.map(item => (
                            <div key={item.id} className='cart__row'>
                                <img className='cart__image' src={item.img} alt={item.name} />
                                <div className='cart__info'>
                                    <h4 className='cart__name'>{item.name}</h4>
                                    <p className='cart__size'>Размер: {item.size}</p>
                                </div>
                                <div className='cart__qty'>
                                    <button onClick={() => decrementQty(item.id)}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => incrementQty(item.id)}>+</button>
                                </div>
                                <div className='cart__price'>{item.price * item.qty} Р</div>
                                <button className='cart__remove' onClick={() => removeItem(item.id)}>×</button>
                            </div>
                        ))}
                        <div className='cart__total'>
                            <span>Итого:</span>
                            <span>{total} Р</span>
                        </div>
                        <button className='cart__checkout'>Оформить заказ</button>
                    </div>
                )}
            </div>
        </main>
    );
}
