import { allItems, clearCart } from '../../../redux/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './OrderForm.module.scss';
import { fetchOrders } from '../../../redux/orderSlice';

const OrderForm = ({ cartItems }) => {
  const dispatch = useDispatch();
  const orderStatus = useSelector((state) => state.orders.status);
  const [order, setOrder] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zipCode: '',
      country: '',
    },
    additionalInfo: '',
    items: cartItems,
  });

  const handleSubmit = () => {
    dispatch(fetchOrders(order));
    if (orderStatus === 'succeeded') {
      dispatch(clearCart);
      setOrder((prev) => ({
        name: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          zipCode: '',
          country: '',
        },
        additionalInfo: '',
        items: [],
      }));
    }
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={order.name}
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={order.email}
            onChange={(e) => setOrder({ ...order, email: e.target.value })}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={order.phone}
            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="street"
            value={order.address.street}
            onChange={(e) =>
              setOrder({
                ...order,
                address: { ...order.address, street: e.target.value },
              })
            }
          />
          <input
            type="text"
            name="city"
            value={order.address.city}
            onChange={(e) =>
              setOrder({
                ...order,
                address: { ...order.address, city: e.target.value },
              })
            }
          />
          <input
            type="text"
            name="zipCode"
            value={order.address.zipCode}
            onChange={(e) =>
              setOrder({
                ...order,
                address: { ...order.address, zipCode: e.target.value },
              })
            }
          />
          <input
            type="text"
            name="country"
            value={order.address.country}
            onChange={(e) =>
              setOrder({
                ...order,
                address: { ...order.address, country: e.target.value },
              })
            }
          />
        </label>
        <label>
          Additional info:
          <textarea
            name="additionalInfo"
            value={order.additionalInfo}
            onChange={(e) =>
              setOrder({ ...order, additionalInfo: e.target.value })
            }
          />
        </label>
        <button type="submit" value="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
