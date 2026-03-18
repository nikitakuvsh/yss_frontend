import './Cart.css';
import { useState, useEffect } from 'react';
import CartModal from './CartModal/CartModal';
import Lottie from 'lottie-react';
import notFoundAnimation from './animations/not-found.json';

const BACKEND_URL = process.env.REACT_APP_BACKEND_API;

export default function Cart() {
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const [openCartModal, setOpenCartModal] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const incrementQty = (id, size) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.size === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQty = (id, size) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.size === size
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            )
        );
    };

    const removeItem = (id, size) => {
        setCartItems(prev =>
            prev.filter(item => !(item.id === id && item.size === size))
        );
    };

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <main className='cart'>
            <div className='cart__content'>
                <h2 className='cart__title'>Корзина</h2>

                {cartItems.length === 0 ? (
                    <div className='cart__empty-block'>
                        <Lottie
                            animationData={notFoundAnimation}
                            loop={true}
                            style={{ width: 350, height: 350 }}
                        />
                        <p className='cart__empty'>Корзина пуста</p>
                    </div>
                ) : (
                    <div className='cart__table'>
                        {cartItems.map(item => (
                            <div
                                key={`${item.id}_${item.size}`}
                                className='cart__row'
                            >
                                <img
                                    className='cart__image'
                                    src={`${BACKEND_URL}/${item.image}`}
                                    alt={item.title}
                                />

                                <div className='cart__info'>
                                    <h4 className='cart__name'>{item.title}</h4>
                                    <p className='cart__size'>
                                        Размер: {item.size}
                                    </p>
                                </div>

                                <div className='cart__qty'>
                                    <button onClick={() => decrementQty(item.id, item.size)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementQty(item.id, item.size)}>+</button>
                                </div>

                                <div className='cart__price'>
                                    {item.price * item.quantity} ₽
                                </div>

                                <button
                                    className='cart__remove'
                                    onClick={() => removeItem(item.id, item.size)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <div className='cart__total'>
                            <span>Итого:</span>
                            <span>{total} ₽</span>
                        </div>

                        <button
                            className='cart__checkout'
                            onClick={() => setOpenCartModal(true)}
                        >
                            Оформить заказ
                        </button>
                    </div>
                )}
            </div>

            {openCartModal && (
                <CartModal
                    onClose={() => setOpenCartModal(false)}
                    totalPrice={total}
                />
            )}
        </main>
    );
}