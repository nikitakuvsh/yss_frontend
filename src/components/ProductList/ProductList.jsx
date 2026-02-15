import './ProductList.css';
import productImage from '../../images/pictures/testTShirt.png';
import { useState } from 'react';

export default function ProductList() {
    const products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    // Состояние выбранного размера для каждой карточки
    const [selectedSizes, setSelectedSizes] = useState({});

    const handleSelectSize = (productId, size) => {
        setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    };

    return (
        <main className='product-list'>
            <div className='product-list__content'>
                <h2 className='product-list__title'>В нашем ассортименте</h2>

                <div className='product-list__grid'>
                    {products.map((productId) => {
                        const selectedSize = selectedSizes[productId] || '';

                        return (
                            <div
                                key={productId}
                                className='product-card'
                                onClick={() => window.location.href = '/product'}
                            >
                                <div className='product-card__image-wrapper'>
                                    <img
                                        className='product-card__image'
                                        alt='T-Shirt Bozy Brand'
                                        src={productImage}
                                    />
                                </div>

                                <h4 className='product-card__title'>
                                    ФУТБОЛКА BOZY BRAND
                                </h4>

                                <p className='product-card__price'>
                                    3500 Р
                                </p>

                                <div className='product-card__sizes'>
                                    {sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`product-card__size ${selectedSize === size ? 'selected' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectSize(productId, size);
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className='product-card__button'
                                    disabled={!selectedSize}
                                >
                                    Добавить в корзину
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
