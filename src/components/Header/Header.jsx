import './Header.css';
import headerLogo from '../../images/pictures/header-logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [activeLink, setActiveLink] = useState('Главная');
    const [menuOpen, setMenuOpen] = useState(false);

    const links = [
        { name: 'Главная', path: '/' },
        { name: 'Мои заказы', path: '/orders' },
        { name: 'Корзина', path: '/cart' }
    ];

    const handleClick = (name) => {
        setActiveLink(name);
        setMenuOpen(false); // закрываем меню после клика
    };

    return (
        <header className='header'>
            <div className='header__content'>
                <div className='header__logo'>
                    <Link to='/' onClick={() => handleClick('Главная')}>
                        <img className='header__logo-image' alt='Young Style Shop logo' src={headerLogo} />
                    </Link>
                </div>

                {/* Бургер */}
                <div
                    className={`burger ${menuOpen ? 'burger--active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div className={`header__nav ${menuOpen ? 'nav--open' : ''}`}>
                {links.map(link => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`header__nav-link ${activeLink === link.name ? 'link--active' : ''}`}
                        onClick={() => handleClick(link.name)}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </header>
    );
}
