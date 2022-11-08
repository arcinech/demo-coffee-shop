import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './CartItem.module.scss';
import { updateItem, deleteItem } from '../../../redux/cartSlice';
import PropTypes from 'prop-types';
import { SITE_URL } from '../../../config/config';

const CartItem = ({ quantity, productId, price, ...props }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [notes, setNotes] = useState(props.notes ?? '');

  const product = useSelector(({ product }) =>
    product.products.find((product) => product.id === productId),
  );

  const increaseQuantity = (e) => {
    e.preventDefault();
    if (itemQuantity < 100 && itemQuantity >= 1) {
      dispatch(
        updateItem({
          productId,
          notes: notes,
          quantity: itemQuantity + 1,
          price,
        }),
      );
      setItemQuantity(itemQuantity + 1);
    }
  };

  const decreseQuantity = (e) => {
    e.preventDefault();
    if (itemQuantity < 100 && itemQuantity >= 1) {
      dispatch(
        updateItem({
          productId,
          notes: notes,
          quantity: itemQuantity - 1,
          price,
        }),
      );
      setItemQuantity(itemQuantity - 1);
    }
  };

  const removeItemAction = () => {
    dispatch(deleteItem({ productId }));
  };

  const updateItemAction = () => {
    dispatch(
      updateItem({
        productId,
        notes: notes,
        quantity: itemQuantity,
        price,
      }),
    );
  };

  const cartControl = !props.summary ? (
    <>
      <div className={styles.control}>
        <button onClick={decreseQuantity}>-</button>
        <input
          type="number"
          min="1"
          max="100"
          value={itemQuantity}
          onKeyPress={(e) => setItemQuantity(e.target.value)}
        />
        <button onClick={increaseQuantity}>+</button>
      </div>
      <div className={styles.notes}>
        <textarea
          placeholder="Item Notes"
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className={styles.action}>
        <button onClick={updateItemAction}>Save Changes</button>
        <button onClick={removeItemAction}>Remove Item</button>
      </div>{' '}
    </>
  ) : (
    <>
      <div className={styles.notes}>
        <label htmlFor="notes">Notes</label>
        {notes.length > 0 ? <p>{notes}</p> : <p>No notes</p>}
      </div>
    </>
  );

  return (
    <article className={styles.root}>
      <div className={styles.image}>
        <img
          src={`${SITE_URL}/assets/${product.images[0].url}`}
          alt={product.name}
        />
      </div>
      <div className={styles.details}>
        <h3>{product.name}</h3>
        <p>Quantity: {itemQuantity}</p>
        <p>Price per piece: {price}</p>
        <p>Price: {price * itemQuantity}</p>
      </div>
      {cartControl}
    </article>
  );
};

export default CartItem;

CartItem.propTypes = {
  productId: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  notes: PropTypes.string,
  summary: PropTypes.bool,
};
