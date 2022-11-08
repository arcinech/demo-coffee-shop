import ProductGrid from '../../common/ProductGrid/ProductGrid';
import Splash from '../../common/Splash/Splash';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../redux/productSlice';
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
