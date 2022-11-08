import { useSelector, useDispatch } from 'react-redux';
import styles from './OrderConfirmation.module.scss';
import { clearCart } from '../../../redux/cartSlice';

const OrderConfirmation = () => {
  const orderStatus = useSelector((state) => state.order.status);
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();

  if (orderStatus === 'loading') {
    return <div className={styles.root}>Loading...</div>;
  } else if (orderStatus === 'error') {
    return <div className={styles.root}>Error...</div>;
  } else {
    dispatch(clearCart());
    return (
      <div className={styles.root}>
        <h2>Thank you for your order!</h2>
        <p>Your order number is {order.id}</p>
      </div>
    );
  }
};

export default OrderConfirmation;
