import { useRef } from 'react';
import styles from './LoginPage.module.scss';
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email: </label>
            <input
              type="email"
              ref="emailInput"
              placeholder="Email"
              required="true"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password: </label>
            <input
              type="password"
              ref="passwordInput"
              placeholder="Password"
              required="true"
            />
          </div>
          <button style={styles.button}>LogIn</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
