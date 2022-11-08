import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SITE_URL } from '../../../config/config';
import styles from './ImageCarousel.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageCarousel = ({ images, setImage }) => {
  const handleClick = (e, index) => {
    e.preventDefault();
    setImage(index);
  };

  return (
    <div className={styles.root}>
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
        {images?.map(({ id, url }, index) => (
          <SwiperSlide key={id}>
            <img
              className={styles.images}
              src={`${SITE_URL}/assets/${url}`}
              alt="product_image"
              onClick={(e) => handleClick(e, index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarousel;
