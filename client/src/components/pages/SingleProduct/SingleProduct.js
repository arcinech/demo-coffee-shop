import styles from './SingleProduct.module.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductBox from '../../common/ProductBox/ProductBox';
import { findProduct } from '../../../redux/productSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const product = useSelector((state) => findProduct(state, id));
  console.log(product);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <ProductBox {...product} grid={false} />
      </div>
    </section>
  );
};

export default SingleProduct;
