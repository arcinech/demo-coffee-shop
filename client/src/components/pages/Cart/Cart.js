import { allItems } from '../../../redux/cartSlice';
import { useSelector } from 'react-redux';
import CartItem from '../../common/CartItem/CartItem';
import styles from './Cart.module.scss';

const Cart = () => {
  const cartItems = useSelector(allItems);

  return (
    <section className={styles.root}>
      {!cartItems ? (
        <h2>Your cart is empty</h2>
      ) : (
        cartItems.map((item) => <CartItem key={item.id} {...item} />)
      )}
    </section>
  );
};

export default Cart;
