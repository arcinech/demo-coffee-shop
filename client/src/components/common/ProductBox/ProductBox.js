import { useState } from 'react';
import styles from './ProductBox.module.scss';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { addToCart } from '../../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SITE_URL } from '../../../config/config';
const ProductBox = ({ name, price, images, id, description, ...props }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        id,
        price,
        quantity: Number(quantity),
      }),
    );

    setQuantity(1);
  };

  const showMore = (e) => {
    e.preventDefault();
    navigate(`product/${id}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <article className={styles.root}>
      <div className={styles.data}>
        <div className={!props.grid ? styles.photo : styles.photoGrid}>
          <img
            src={`${SITE_URL}/assets/${images[imageIndex].url}`}
            alt={name}
          />
        </div>
        <div className={styles.details}>
          <h3>{name}</h3>
          <p className={styles.price}>${price}</p>
          <p className={styles.description}>{description}</p>
        </div>

        {!props.grid ? (
          <ImageCarousel images={images} setImage={setImageIndex} />
        ) : null}

        {!props.grid ? (
          <form className={styles.cart} onSubmit={handleAddToCart}>
            <input
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              min="1"
              max="100"
            />
            <button>Add to cart</button>
          </form>
        ) : (
          <div className={styles.control}>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={showMore}>More...</button>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductBox;

ProductBox.propTypes = {
  id: PropTypes.string.isRequired, // id of the product
  name: PropTypes.string.isRequired, // name of the product
  price: PropTypes.number.isRequired, // price of the product
  images: PropTypes.arrayOf(PropTypes.object), // array of images
  description: PropTypes.string, // description of the product
  grid: PropTypes.bool, // if true, the component will be displayed in the grid
};
