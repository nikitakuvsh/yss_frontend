import Header from "./components/Header/Header";
import UnderHeader from "./components/UnderHeader/UnderHeader";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <Header />
      <UnderHeader />
      <ProductList />
      <Footer />
    </div>
  );
}

