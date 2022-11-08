import CartSummary from '../../common/CartSummary/CartSummary';
import OrderForm from '../../common/OrderForm/OrderForm';
import styles from './OrderPage.module.scss';

const OrderPage = () => {
  return (
    <section className={styles.root}>
      <h2>Order summary</h2>
      <CartSummary />
      <OrderForm />
    </section>
  );
};

export default OrderPage;
