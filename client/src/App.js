import 'styles/global.scss';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/views/Home/Home';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
