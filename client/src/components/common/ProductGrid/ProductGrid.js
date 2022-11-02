import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ProductGrid = () => {
  const products = useSelector((state) => state?.products?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  });
};
