import styles from './Splash.module.scss';

const Splash = () => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.text}>
          <h1>Welcome to the Coffee World!</h1>
          <h3>Coffee for all your needs</h3>
        </div>
      </div>
    </section>
  );
};

export default Splash;
