import { allItems } from '../../../redux/cartSlice';
import { useSelector } from 'react-redux';
import CartItem from '../../common/CartItem/CartItem';
import styles from './Cart.module.scss';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const cartItems = useSelector(allItems);
  const navigate = useNavigate();

  const processToOrder = (e) => {
    e.preventDefault();
    navigate('/order');
  };

  return (
    <section className={styles.root}>
      {!cartItems ? (
        <h2>Your cart is empty</h2>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <a className={styles.button} onClick={processToOrder} href="/order">
            Process order
          </a>
        </>
      )}
    </section>
  );
};

export default Cart;
