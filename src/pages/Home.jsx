import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CartDrawer from '../components/CartDrawer';
import ConfirmOrderModal from '../components/ConfirmOrderModal.jsx';
import ProductSkeleton from '../components/ProductSkeleton.jsx';
import {useState, useEffect} from 'react';
import {useProductsQueries} from '../hooks/useProductsQueries.js';
import { useCategoriesQueries } from '../hooks/useCategoriesQueries.js';

export default function Home() {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  },[searchTerm, categoryFilter]);

  const {data: data, isLoading, isError} = useProductsQueries(searchTerm, categoryFilter, page);
  const { data: categories = [] } = useCategoriesQueries();

  const dessertsList = data?.data || [];
  const totalPages = data?.totalPages || 1;

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
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
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

          {!isLoading && !isError && dessertsList.length === 0 && (
            <div className="text-rose-500 font-semibold mt-8 text-center p-10">
              No se encontraron resultados.
            </div>
          )}

          {!isLoading && !isError && dessertsList.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {dessertsList.map((dessert, index) => (
                  <ProductCard 
                    key={dessert.name || index} 
                    dessert={dessert} 
                  />
                ))}
              </div>
              <div className='mt-10 p-4 border-t border-rose-100 flex items-center justify-between text-sm text-rose-500'>
                <button 
                onClick={() => setPage(old => Math.max(old - 1, 1))}
                disabled={page === 1}
                className='px-5 py-2.5 border border-rose-300 rounded-lg hover:bg-rose-50 disabled:opacity-50 transition-colors font-semibold'
                >
                  anterior
                </button>
                <span>Página <strong className="text-rose-900">{page}</strong> de <strong className="text-rose-900">{totalPages}</strong></span>
                <button
                onClick={() => setPage(old => (old < totalPages ? old + 1 : old))}
                disabled={page >= totalPages}
                className="px-5 py-2.5 border border-rose-300 rounded-lg hover:bg-rose-50 disabled:opacity-50 transition-colors font-semibold"
                >
                  Siguiente
                </button>
              </div>
            </>
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