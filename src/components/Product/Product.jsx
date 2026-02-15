import './Product.css';
import firstPicture from '../../images/pictures/testTShirt.png';
import secondPicture from '../../images/pictures/t-shirt.png';
import { useState } from 'react';

export default function Product() {
    const picturesArray = [firstPicture, secondPicture];
    const sizes = ['S', 'M', 'L', 'XL'];

    const [selectedPicture, setSelectedPicture] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [zoom, setZoom] = useState({ active: false, x: 0, y: 0 });

    return (
        <main className='product'>
            <div className='product__wrapper'>
                {/* Слева: миниатюры */}
                <div className='product__thumbnails'>
                    {picturesArray.map((pic, index) => (
                        <img
                            key={index}
                            src={pic}
                            className={`product__thumbnail ${selectedPicture === index ? 'active' : ''}`}
                            onClick={() => setSelectedPicture(index)}
                            alt={`Thumbnail ${index}`}
                        />
                    ))}
                </div>

                {/* Середина: большая фотография с лупой */}
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
                        src={picturesArray[selectedPicture]}
                        alt='Product'
                    />
                    {zoom.active && (
                        <div
                            className='product__zoom'
                            style={{
                                backgroundImage: `url(${picturesArray[selectedPicture]})`,
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

                {/* Справа: размеры, кнопка и описание */}
                <div className='product__actions'>
                    {/* Новые блоки */}
                    <div>
                        <div className='product__description'>
                            <h4>Описание товара</h4>
                            <p>
                                Стильная футболка из 100% хлопка, мягкая и приятная на ощупь. Отлично подходит для повседневной носки и создания модных образов.
                                Материал обеспечивает комфорт при любых погодных условиях, а современный крой подчеркивает фигуру.
                                Доступна в нескольких цветах и размерах, легко комбинируется с джинсами, шортами и спортивными брюками.
                            </p>
                            <p>
                                Рекомендуется машинная стирка при температуре до 30°C с аналогичными цветами.
                                Не отбеливать, не использовать химчистку. Сушить в тени, избегая прямого солнечного света, чтобы сохранить яркость цвета и форму изделия.
                            </p>

                        </div>

                        <div className='product__delivery'>
                            <h4>Доставка</h4>
                            <p>Доставка по России — 2–5 дней. Возможна курьерская доставка или самовывоз из магазина.</p>
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
                        >
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
