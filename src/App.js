import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import UnderHeader from "./components/UnderHeader/UnderHeader";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import PageNotFound from './components/PageNotFound/PageNotFound';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
// import DoubleSlider from './components/DoubleSlider/DoubleSlider';
import Orders from './components/Orders/Orders';
import './styles.css';
import OrderStatus from './components/Orders/OrderStatus/OrderStatus';
import PaymentStatus from './components/PaymentStatus/PaymentStatus';

export default function App() {

  const handleAddToCart = (product, selectedSize) => {
    if (!selectedSize) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(
      item => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0],
        size: selectedSize,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

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
                <ProductList onAddToCart={handleAddToCart}/>
              </>
            } />
            <Route path="*" element={<PageNotFound />} />
            <Route path='/product/:id' element={<Product onAddToCart={handleAddToCart} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order/:id' element={<OrderStatus />} />
            <Route path='/payment' element={<PaymentStatus />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

