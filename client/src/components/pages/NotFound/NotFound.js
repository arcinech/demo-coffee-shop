import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <section className={styles.root}>
      <h1>404</h1> <p>Page not found</p>
    </section>
  );
};

export default NotFound;
