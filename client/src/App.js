import 'styles/global.scss';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
import SingleProduct from './components/views/SingleProduct/SingleProduct';
import Cart from './components/views/Cart/Cart';
import OrderPage from './components/pages/OrderPage/OrderPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderpage" element={<OrderPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
