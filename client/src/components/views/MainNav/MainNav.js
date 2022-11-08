import styles from './MainNav.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

const MainNav = () => {
  return (
    <nav className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <FontAwesomeIcon icon={faMugHot} />
          </NavLink>
        </div>
        <div className={styles.right}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            Cart
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
