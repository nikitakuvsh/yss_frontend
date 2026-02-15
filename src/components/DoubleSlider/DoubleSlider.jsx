import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './DoubleSlider.css';

import pic1 from '../../images/slider/pic1.png';
import pic2 from '../../images/slider/pic2.png';
import pic3 from '../../images/slider/pic3.png';
import pic4 from '../../images/slider/pic4.png';
import pic5 from '../../images/slider/pic5.png';


export default function DoubleSlider() {
  const pictures = [pic1, pic2, pic3, pic4, pic5];

  // создаём слайды по 2 картинки
  const slides = [];
  for (let i = 0; i < pictures.length; i++) {
    slides.push([pictures[i], pictures[(i + 1) % pictures.length]]);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="double-slider-wrapper">
      <div className="double-slider__overlay-text">YSS</div>
      <div className="double-slider__overlay-text text--under">Young Style Shop</div>

      <Slider {...settings}>
        {slides.map((pair, index) => (
          <div key={index} className="double-slider__slide">
            {pair.map((pic, idx) => (
              <img
                key={idx}
                src={pic}
                alt={`Slide ${index}-${idx}`}
                className="double-slider__image"
              />
            ))}
          </div>
        ))}
      </Slider>
    </div>
  );
}
