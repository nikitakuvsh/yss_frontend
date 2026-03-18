import './ProductList.css';
import { useState, useEffect } from 'react';
import ModalMessage from '../ModalMessage/ModalMessage';

export default function ProductList({ onAddToCart }) {
    const API = process.env.REACT_APP_BACKEND_API;

    const [products, setProducts] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [modalMessageView, setModalMessageView] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        fetch(API + "/items")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Ошибка загрузки:", err));
    }, []);

    const handleSelectSize = (productId, size) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    return (
        <main className='product-list'>
            <div className='product-list__content'>
                <h2 className='product-list__title'>В нашем ассортименте</h2>

                <div className='product-list__grid'>
                    {products.map((product) => {
                        const selectedSize = selectedSizes[product.id] || '';

                        return (
                            <div
                                key={product.id}
                                className='product-card'
                                onClick={() => window.location.href = '/product/' + product.id}
                            >
                                <div className='product-card__image-wrapper'>
                                    <img
                                        className='product-card__image'
                                        alt={product.title}
                                        src={`${API}/${product.images?.[0]}`}
                                    />
                                </div>

                                <h4 className='product-card__title'>
                                    {product.title}
                                </h4>

                                <p className='product-card__price'>
                                    {product.price} ₽
                                </p>

                                <div className='product-card__sizes'>
                                    {product.sizes?.map(size => (
                                        <button
                                            key={size}
                                            className={`product-card__size ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectSize(product.id, size);
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className='product-card__button'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!selectedSize) {
                                            setIsError(true);
                                            setModalMessage('Сначала необходимо выбрать размер!');
                                            setModalMessageView(true);
                                        } else {
                                            onAddToCart(product, selectedSize);
                                            setIsError(false);
                                            setModalMessage('Товар успешно добавлен в корзину!');
                                            setModalMessageView(true);
                                        }
                                    }}
                                >
                                    Добавить в корзину
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {modalMessageView && (<ModalMessage message={modalMessage} isError={isError} onClose={() => setModalMessageView(false)} />)}
        </main>
    );
}