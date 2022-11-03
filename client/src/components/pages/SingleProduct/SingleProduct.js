import styles from './SingleProduct.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SingleProduct = () => {
  const { id } = useParams();
  const product = useSelector(({ products }) =>
    products.find((product) => product.id === id),
  );

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h1>Single Product</h1>
      </div>
    </section>
  );
};

export default SingleProduct;
