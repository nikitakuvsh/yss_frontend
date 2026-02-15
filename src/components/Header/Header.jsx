import './Header.css';
import headerLogo from '../../images/pictures/header-logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // для SPA навигации

export default function Header() {
    const [activeLink, setActiveLink] = useState('Главная');

    const links = [
        { name: 'Главная', path: '/' },
        { name: 'Мои заказы', path: '/orders' },
        { name: 'Корзина', path: '/cart' }
    ];

    return (
        <header className='header'>
            <div className='header__content'>
                <div className='header__logo'>
                    <Link to='/' onClick={() => setActiveLink('Главная')}>
                        <img className='header__logo-image' alt='Young Style Shop logo' src={headerLogo} />
                    </Link>
                </div>
            </div>

            <div className='header__nav'>
                {links.map(link => (
                    <Link
                        key={link.name}
                        to={link.path}
                        className={`header__nav-link ${activeLink === link.name ? 'link--active' : ''}`}
                        onClick={() => setActiveLink(link.name)}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </header>
    );
}
