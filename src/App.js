import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import UnderHeader from "./components/UnderHeader/UnderHeader";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import PageNotFound from './components/PageNotFound/PageNotFound';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import DoubleSlider from './components/DoubleSlider/DoubleSlider';
import './styles.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <UnderHeader />
                <DoubleSlider />
                <ProductList />
              </>
            } />
            <Route path="*" element={<PageNotFound />} />
            <Route path='/product' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

