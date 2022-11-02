import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { SITE_URL } from '../../../config/config';

import 'swiper/swiper.scss';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/pagination/pagination.scss';

const ImageCarousel = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      slidesPerView={1}
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={`${SITE_URL}/${image}.jpg`} alt="product" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
