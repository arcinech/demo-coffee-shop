import { useSelector } from 'react-redux';
import styles from './ProductGrid.module.scss';
import ProductBox from '../ProductBox/ProductBox';
import { Pagination, A11y, Navigation, Grid } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

const ProductGrid = () => {
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else
    return (
      <div className={styles.root}>
        <Swiper
          modules={[Navigation, Pagination, A11y, Grid]}
          slidesPerView={1}
          spaceBetween={10}
          grid={{ rows: 1, fill: 'row' }}
          navigation
          style={styles.swiper}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
              grid: { rows: 2, fill: 'row' },
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
              gridRows: 2,
              grid: { rows: 2, fill: 'row' },
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductBox {...product} grid={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default ProductGrid;
