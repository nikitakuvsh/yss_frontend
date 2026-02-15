import './UnderHeader.css';
import { useState, useEffect } from 'react';
import tShirt from '../../images/pictures/t-shirt.png';
import instagramIcon from '../../images/icons/instaicon.png';
import telegramIcon from '../../images/icons/telegaicon.png';
import vkIcon from '../../images/icons/vkicon.png';

export default function UnderHeader() {
    const fullText = 'ЭТО точно ТВОЙ ВЫБОР!';
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const speed = 70; // время между буквами в мс, можно регулировать
        const timer = setInterval(() => {
            setDisplayedText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(timer);
        }, speed);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className='under-header'>
            <div className='under-header__content'>
                <h2 className='under-header__content-title'>{displayedText}</h2>
                
                <p className='under-header__content-subtitle'>
                    Одежда на любой вкус и цвет. Топовые бренды по низким ценам!
                </p>

                <div className='under-header__social'>
                    <span className='under-header__social-label'>
                        МЫ В СОЦИАЛЬНЫХ СЕТЯХ
                    </span>

                    <div className='under-header__social-links'>
                        <a href="#" className='under-header__social-link' title="Instagram">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>

                        <a href="#" className='under-header__social-link' title="Telegram">
                            <img src={telegramIcon} alt="Telegram" />
                        </a>

                        <a href="#" className='under-header__social-link' title="VK">
                            <img src={vkIcon} alt="VK" />
                        </a>
                    </div>
                </div>

                <div className='under-header__content-image--absolute right'>
                    <img 
                        className='under-header__content-image-picture' 
                        alt='t-shirt' 
                        src={tShirt} 
                    />
                </div>
            </div>
        </section>
    );
}
