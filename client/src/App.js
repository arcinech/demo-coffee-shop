import './styles/global.scss';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import SingleProduct from './components/pages/SingleProduct/SingleProduct';
import Cart from './components/pages/Cart/Cart';
import OrderPage from './components/pages/OrderPage/OrderPage';
import OrderConfirmation from './components/pages/OrderConfirmation/OrderConfirmation';
import Catalog from './components/pages/Catalog/Catalog';
import NotFound from './components/pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
