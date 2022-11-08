import styles from './Header.module.scss';
import MainNav from '../MainNav/MainNav';

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <MainNav />
      </div>
    </header>
  );
};

export default Header;
