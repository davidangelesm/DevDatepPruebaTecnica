import Header from './components/Header.jsx';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { dessertsData } from './data/data.js';
import {useState} from 'react';
import ConfirmOrderModal from './components/ConfirmOrderModal.jsx';

function App() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Header />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {dessertsData.map((dessert, index) => (
              <ProductCard 
                key={dessert.name} 
                dessert={dessert} 
                isActive={index === 1 || index === 3 || index === 6} 
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <CartDrawer onConfirmOrder={() => setIsConfirmModalOpen(true)} />
        </div>
        <ConfirmOrderModal isOpen={isConfirmModalOpen} onStartNewOrder={() => setIsConfirmModalOpen(false)} />
      </div>
    </div>
  );
}

export default App;