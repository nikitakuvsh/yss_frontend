import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import UnderHeader from "./components/UnderHeader/UnderHeader";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import PageNotFound from './components/PageNotFound/PageNotFound';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import DoubleSlider from './components/DoubleSlider/DoubleSlider';
import Orders from './components/Orders/Orders';
import './styles.css';
import OrderStatus from './components/Orders/OrderStatus/OrderStatus';

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
                {/* <DoubleSlider /> */}
                <ProductList />
              </>
            } />
            <Route path="*" element={<PageNotFound />} />
            <Route path='/product' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />}></Route>
            <Route path='/order/:id' element={<OrderStatus />}></Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

