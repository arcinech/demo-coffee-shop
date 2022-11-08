import { useSelector } from 'react-redux';
import styles from './CartSummary.module.scss';
import CartItem from '../CartItem/CartItem';

const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div className={styles.root}>
      <h2>Cart Summary</h2>
      {cartItems.map((item) => (
        <div key={item.productId}>
          <CartItem {...item} summary={true} />
        </div>
      ))}
    </div>
  );
};

export default CartSummary;
