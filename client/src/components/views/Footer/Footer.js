import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>Developed by Marcin Lech</p>
        </div>
        <div className={styles.right}>
          <p>2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
