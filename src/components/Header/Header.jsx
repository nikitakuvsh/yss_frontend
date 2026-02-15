import './Header.css';
import headerLogo from '../../images/pictures/header-logo.png';
import { useState } from 'react';

export default function Header() {
    const [activeLink, setActiveLink] = useState('Главная');

    const links = ['Главная', 'Мои заказы', 'Корзина'];

    return (
        <header className='header'>
            <div className='header__content'>
                <div className='header__logo'>
                    <img className='header__logo-image' alt='Young Style Shop logo' src={headerLogo} onClick={() => window.location.href = '/'}/>
                </div>
            </div>

            <div className='header__nav'>
                {links.map(link => (
                    <a
                        key={link}
                        className={`header__nav-link ${activeLink === link ? 'link--active' : ''}`}
                        onClick={() => setActiveLink(link)}
                    >
                        {link}
                    </a>
                ))}
            </div>
        </header>
    );
}
