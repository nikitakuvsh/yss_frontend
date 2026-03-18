import './Product.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Product({ onAddToCart }) {
    const API = process.env.REACT_APP_BACKEND_API;

    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedPicture, setSelectedPicture] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

    useEffect(() => {
        fetch(`${API}/items/item/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error("Ошибка загрузки:", err));
    }, [id]);

    if (!product) return <div>Загрузка...</div>;

    const picturesArray = product.images || [];
    const sizes = product.sizes || [];

    return (
        <main className='product'>
            <div className='product__wrapper'>

                {/* миниатюры */}
                <div className='product__thumbnails'>
                    {picturesArray.map((pic, index) => (
                        <img
                            key={index}
                            src={`${API}/${pic}`}
                            className={`product__thumbnail ${selectedPicture === index ? 'active' : ''}`}
                            onClick={() => setSelectedPicture(index)}
                            alt=""
                        />
                    ))}
                </div>

                {/* главная картинка */}
                <div
                    className='product__main-image-wrapper'
                    onMouseMove={(e) => {
                        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - left) / width) * 100;
                        const y = ((e.clientY - top) / height) * 100;
                        setZoom({ active: true, x, y });
                    }}
                    onMouseLeave={() => setZoom({ ...zoom, active: false })}
                >
                    <img
                        className='product__main-image'
                        src={`${API}/${picturesArray[selectedPicture]}`}
                        alt=""
                    />

                    {zoom.active && (
                        <div
                            className='product__zoom'
                            style={{
                                backgroundImage: `url(${API}/${picturesArray[selectedPicture]})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '150% 150%',
                                backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '5px',
                                pointerEvents: 'none',
                            }}
                        />
                    )}
                </div>

                {/* справа */}
                <div className='product__actions'>
                    <div>
                        <h2>{product.title}</h2>

                        <p className='product__price'>
                            {product.price} ₽
                        </p>

                        <div className='product__description'>
                            <h4>Описание</h4>
                            <p>{product.description}</p>
                        </div>

                        <div className='product__delivery'>
                            <h4>Доставка</h4>
                            <p>2–5 дней</p>
                        </div>
                    </div>

                    <div>
                        <div className='product__sizes'>
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`product__size-button ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        <button
                            className='product__add-to-cart'
                            disabled={!selectedSize}
                            onClick={() => onAddToCart(product, selectedSize)}
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}