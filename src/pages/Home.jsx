import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CartDrawer from '../components/CartDrawer';
import ConfirmOrderModal from '../components/ConfirmOrderModal.jsx';
import ProductSkeleton from '../components/ProductSkeleton.jsx';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getProducts} from '../services/api.js';

export default function Home() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const {data: desserts = [], isLoading, isError} = useQuery({
    queryKey: ['products', searchTerm, categoryFilter],
    queryFn: () => getProducts(searchTerm, categoryFilter),
  });

  const skeletonArray = Array.from({ length: 6 });

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <Header />

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input 
              type="text" 
              placeholder="Buscar postre..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-rose-300 focus:outline-none focus:border-red focus:ring-1 focus:ring-red text-rose-900 bg-white"
            />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-rose-300 focus:outline-none focus:border-red focus:ring-1 focus:ring-red text-rose-900 bg-white"
            >
              <option value="">Todas las categorías</option>
              <option value="Pasteles">Pasteles</option>
              <option value="Postres Cremosos">Postres Cremosos</option>
              <option value="Repostería">Repostería</option>
            </select>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {skeletonArray.map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          )}

          {isError && (
            <div className="text-red font-semibold mt-8 bg-rose-50 p-4 rounded-xl">
              Hubo un problema al cargar los postres. Por favor, intenta nuevamente.
            </div>
          )}

          {!isLoading && !isError && desserts.length === 0 && (
            <div className="text-rose-500 font-semibold mt-8 text-center p-10">
              No se encontraron resultados.
            </div>
          )}

          {!isLoading && !isError && desserts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {desserts.map((dessert, index) => (
                <ProductCard 
                  key={dessert.name || index} 
                  dessert={dessert} 
                />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <CartDrawer onConfirmOrder={() => setIsConfirmModalOpen(true)} />
        </div>
      </div>
      <ConfirmOrderModal isOpen={isConfirmModalOpen} onStartNewOrder={() => setIsConfirmModalOpen(false)} />
    </div>
  );
}