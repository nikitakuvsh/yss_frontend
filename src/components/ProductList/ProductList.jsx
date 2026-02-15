import './ProductList.css';
import productImage from '../../images/pictures/testTShirt.png';

export default function ProductList() {
    return (
        <main className='product-list'>
            <div className='product-list__content'>
                <h2 className='product-list__title'>В нашем ассортименте</h2>

                <div className='product-list__grid'>
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className='product-card'>
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
                                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                    <button key={size} className='product-card__size'>
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <button className='product-card__button'>
                                Добавить в корзину
                            </button>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
