import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './ProductBox.module.scss';
import { updateItem, deleteItem } from '../../../redux/cartSlice';

const CartItem = ({ quantity, id, name, price, image, ...props }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState(props.notes || '');
  const [changeQantity, setChangeQantity] = useState(quantity);

  const increaseQuantity = (e) => {
    e.preventDefault();
    if (changeQantity < 10) {
      setChangeQantity((prev) => prev + 1);
    }
  };

  const decreseQuantity = (e) => {
    e.preventDefault();
    if (changeQantity > 2) {
      setChangeQantity((prev) => prev - 1);
    }
  };

  const removeItemAction = () => {
    dispatch(deleteItem({ id }));
  };

  const updateItemAction = () => {
    dispatch(updateItem({ id, notes, quantity: changeQantity }));
  };

  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.details}>
        <h3>{name}</h3>
        <p>Quantity: {quantity}</p>
        <p>Price: {price}</p>
      </div>
      <div className={styles.notes}>
        <label htmlFor="notes">Notes</label>
        <textarea
          name="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.control}>
        <button onClick={decreseQuantity}>-</button>
        <input type="number" min="1" max="10" value={changeQantity} />
        <button onClick={increaseQuantity}>+</button>
      </div>
      <div className={styles.actions}>
        <button onClick={updateItemAction}>Save Changes</button>
        <button onClick={removeItemAction}>Remove Item</button>
      </div>
    </div>
  );
};

export default CartItem;
