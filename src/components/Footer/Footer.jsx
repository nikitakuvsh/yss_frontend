import './Footer.css';
import footerLogo from '../../images/pictures/header-logo.png';
import instagramIcon from '../../images/icons/instaicon.png';
import telegramIcon from '../../images/icons/telegaicon.png';
import vkIcon from '../../images/icons/vkicon.png';

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <div className='footer__top'>
                    <img className='footer__logo' src={footerLogo} alt='Logo' />
                    <div className='footer__links'>
                        <a href='#' className='footer__link'>Главная</a>
                        <a href='#' className='footer__link'>Мои заказы</a>
                        <a href='#' className='footer__link'>Корзина</a>
                    </div>
                    <div className='footer__socials'>
                        <a href='#'><img src={instagramIcon} alt='Instagram'/></a>
                        <a href='#'><img src={telegramIcon} alt='Telegram'/></a>
                        <a href='#'><img src={vkIcon} alt='VK'/></a>
                    </div>
                </div>
                <div className='footer__bottom'>
                    <p>© 2026 Young Style Shop. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}
