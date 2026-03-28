import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Features from './components/Features/Features';
import Product from './components/Product/Product';
import Benefits from './components/Benefits/Benefits';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Home />
      <Features />
      <Product />
      <Benefits />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
