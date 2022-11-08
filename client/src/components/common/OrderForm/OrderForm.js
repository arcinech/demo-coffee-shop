import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './OrderForm.module.scss';
import { postOrder } from '../../../redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const OrderForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const addOrderRequest = (data) => dispatch(postOrder(data));

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
    items: cartItems || [],
  });

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = () => {
    addOrderRequest(order);
    navigate('/order-confirmation');
  };

  const handleAddressChange = (e) => {
    setOrder({
      ...order,
      address: { ...order.address, [e.target.name]: e.target.value },
    });
  };

  const handleOrderChange = (e) => {
    setOrder((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.root}>
      <form onSubmit={validate(handleSubmit)} className={styles.form}>
        <div className={styles.formBlock}>
          <label htmlFor="name">Name:</label>
          <input
            {...register('name', {
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
            type="text"
            name="name"
            value={order.name}
            onChange={handleOrderChange}
          />
          {errors.name && (
            <small className={styles.warning}>
              Name is too short or too long!(min.3, max.100)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="email">Email:</label>
          <input
            {...register('email', {
              required: true,
              minLength: 3,
              maxLength: 100,
            })}
            type="email"
            name="email"
            value={order.email}
            onChange={handleOrderChange}
            required="required"
          />
          {errors.email && (
            <small className={styles.warning}>
              Email is too short or too long!(min.3, max.50)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="phone">Phone:</label>
          <input
            {...register('phone', {
              required: true,
              minLenght: 9,
              maxLength: 12,
            })}
            type="tel"
            name="phone"
            value={order.phone}
            onChange={handleOrderChange}
            required="required"
          />
          {errors.phone && (
            <small className={styles.warning}>
              Phone is too short or too long!(min.3, max.50)
            </small>
          )}
        </div>
        <label className={styles.spacer}>Address:</label>
        <div className={styles.formBlock}>
          <label htmlFor="street">Street:</label>
          <input
            {...register('street', {
              required: true,
              minLenght: 3,
              maxLength: 50,
            })}
            type="text"
            name="street"
            value={order.address.street}
            onChange={handleAddressChange}
            required="required"
          />
          {errors.street && (
            <small className={styles.warning}>
              Street is too short or too long!(min.3, max.50)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="city">City:</label>
          <input
            {...register('city', {
              required: true,
              minLenght: 3,
              maxLength: 50,
            })}
            type="text"
            name="city"
            value={order.address.city}
            onChange={handleAddressChange}
            required="required"
          />
          {errors.city && (
            <small className={styles.warning}>
              City is too short or too long!(min.3, max.50)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="zipCode">Zip code:</label>
          <input
            {...register('zipCode', {
              required: true,
              minLenght: 3,
              maxLength: 50,
            })}
            type="text"
            name="zipCode"
            value={order.address.zipCode}
            onChange={handleAddressChange}
            required="required"
          />
          {errors.zipCode && (
            <small className={styles.warning}>
              ZipCode is too short or too long!(min.5, max.9)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="country">Country:</label>
          <input
            {...register('country', {
              required: true,
              minLenght: 3,
              maxLength: 50,
            })}
            type="text"
            name="country"
            value={order.address.country}
            onChange={handleAddressChange}
            required="required"
          />
          {errors.country && (
            <small className={styles.warning}>
              Country is too short or too long!(min.3, max.50)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="buildingNumber">Building number:</label>
          <input
            {...register('buildingNumber', {
              required: true,
              min: 1,
              max: 500,
            })}
            type="number"
            name="buildingNumber"
            value={order.address.buildingNumber}
            onChange={handleAddressChange}
            required="required"
          />
          {errors.buildingNumber && (
            <small className={styles.warning}>
              Bulding number is too short or too long!(min.3, max.50)
            </small>
          )}
        </div>
        <div className={styles.formBlock}>
          <label htmlFor="flatNumber">Flat number:</label>
          <input
            type="text"
            name="flatNumber"
            value={order.address.flatNumber}
            onChange={handleAddressChange}
          />
        </div>
        <div className={styles.spacer}>
          <label>Additional info:</label>
          <textarea
            name="additionalInfo"
            value={order.additionalInfo}
            onChange={handleOrderChange}
          />
        </div>
        <button type="submit" value="Submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
