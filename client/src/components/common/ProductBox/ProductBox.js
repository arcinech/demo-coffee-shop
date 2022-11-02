import { useState } from 'react';
import styles from './ProductBox.module.scss';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

const ProductBox = ({ name, price, images, id, description, ...props }) => {
  const [image, setImage] = useState(0);

  return (
    <article className={styles.root}>
      <div className={styles.photo}>
        <img src={image} alt={name} />
      </div>

      {!props.list ? null : (
        <ImageCarousel images={images} setImage={setImage} />
      )}
    </article>
  );
};

export default ProductBox;
