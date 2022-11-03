import { useState } from 'react';
import styles from './ProductBox.module.scss';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { addToCart } from '../../../redux/cartSlice';
import { useDispatch } from 'react-redux';

const ProductBox = ({
  name,
  price,
  images,
  id,
  description,
  showGallery,
  ...props
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = () => {
    dispatch(
      addToCart({
        id,
        name,
        price,
        image: images[0],
        quantity,
      }),
    );

    setQuantity(() => 1);
  };

  return (
    <article className={styles.root}>
      <div className={styles.photo}>
        <img src={images[imageIndex]} alt={name} />
      </div>

      {!showGallery ? null : (
        <ImageCarousel images={images} setImage={setImageIndex} />
      )}

      <form className={styles.cart} onSubmit={handleSubmit}>
        <input
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          min="1"
          max="10"
        />
        <button>Add to cart</button>
      </form>
    </article>
  );
};

export default ProductBox;
