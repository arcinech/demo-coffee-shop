import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../../redux/productSlice';

const ProductGrid = () => {
  const products = useSelector((state) => state?.products?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  });
};
