import CartSummary from '../../common/CartSummary/CartSummary';
import OrderForm from '../../common/OrderForm/OrderForm';
import { useSelector } from 'react-redux';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <section className={styles.root}>
      <h2>Order summary</h2>
      <CartSummary {...cartItems} />
      <OrderForm cartItems={cartItems} />
    </section>
  );
};

export default OrderPage;
