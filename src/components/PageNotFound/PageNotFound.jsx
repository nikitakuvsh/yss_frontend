import './PageNotFound.css';
import Lottie from 'lottie-react';
import notFoundAnimation from './animations/404.json';

export default function PageNotFound() {
    return (
        <section className='page-not-found'>
            <Lottie
                animationData={notFoundAnimation}
                loop={true}
                style={{ width: '50em', height: '50%' }}
            />
        </section>
    );
}