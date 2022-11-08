import ProductGrid from '../../common/ProductGrid/ProductGrid';
import Splash from '../../common/Splash/Splash';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/productSlice';
const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.product.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } else
    return (
      <div className={styles.root}>
        <Splash />
        <section className={styles.container}>
          <ProductGrid />
        </section>
      </div>
    );
};

export default Home;
