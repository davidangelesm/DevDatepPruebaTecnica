import { useParams, Link } from 'react-router-dom';
import NotFound from './NotFound.jsx';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton.jsx';
import {useProductByIdQuery} from '../hooks/useProductsQueries.js';
import {useCartStore} from '../stores/cartStore.js';
import QuantityStepper from '../components/QuantityStepper.jsx';

export default function ProductDetail() {
  const { id } = useParams();

  const { items, addItem, increaseQuantity, decreaseQuantity } = useCartStore();
  const {data: product, isLoading, isError, error} = useProductByIdQuery(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFound />;
    }
    return (
      <div className="text-center p-10 text-red font-bold">
        Error de conexión al cargar el producto.
      </div>
    );
  }

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isActive = quantity > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <Link to="/" className="text-rose-500 hover:text-red flex items-center gap-2 mb-8 font-semibold">
        ← Volver al catálogo
      </Link>
      
      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <picture className="w-full md:w-1/2">
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img 
            src={product.image.mobile} 
            alt={product.name} 
            className="w-full rounded-xl object-cover shadow-sm"
          />
        </picture>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <span className="inline-block bg-rose-100 text-rose-700 text-sm font-bold tracking-wide uppercase px-3 py-1 rounded-full w-max">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-rose-900">{product.name}</h1>
          <p className="text-3xl font-bold text-red mt-2">${product.price.toFixed(2)}</p>
          
          <div className="mt-6 w-40">
            {isActive ? (
              <QuantityStepper 
                quantity={quantity} 
                onIncrease={() => increaseQuantity(product.id)}
                onDecrease={() => decreaseQuantity(product.id)}
              />
            ) : (
              <button 
                onClick={() => addItem(product)}
                className="w-full bg-red text-white py-3 px-8 rounded-full font-semibold hover:bg-rose-900 transition-colors"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}