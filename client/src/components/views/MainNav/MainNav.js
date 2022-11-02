import styles from './MainNav.module.scss';

const MainNav = () => {
  return (
    <nav className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>Logo</p>
        </div>
        <div className={styles.right}>
          <p>Menu</p>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
