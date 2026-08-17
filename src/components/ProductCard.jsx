import { Link } from 'react-router-dom';
import QuantityStepper from './QuantityStepper';
import {useCartStore} from '../stores/cartStore.js';

export default function ProductCard({ dessert }) {

  const {items, addItem, increaseQuantity, decreaseQuantity} = useCartStore();

  const cartItem = items.find((item) => item.id === dessert.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isActive = quantity > 0;

  return (
    <article className="flex flex-col gap-4">
      <div className="relative">
        <Link to={`/product/${dessert.id}`}>
          <picture>
            <source media="(min-width: 1024px)" srcSet={dessert.image.desktop} />
            <source media="(min-width: 768px)" srcSet={dessert.image.tablet} />
            <img 
              src={dessert.image.mobile} 
              alt={dessert.name} 
              className={`w-full rounded-xl transition-all duration-300 ${
                isActive ? 'border-2 border-red' : 'border-2 border-transparent'
              }`}
            />
          </picture>
        </Link>

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-40">
          {isActive ? (
            <QuantityStepper 
            quantity={quantity} 
            onIncrease={() => increaseQuantity(dessert.id)} 
            onDecrease={() => decreaseQuantity(dessert.id) } />
          ) : (
            <button onClick={() => addItem(dessert)} className="w-full bg-white border border-rose-400 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 hover:border-red hover:text-red transition-colors font-semibold text-rose-900 text-sm">
              <img src="/assets/images/icon-add-to-cart.svg" alt="Add to cart icon" />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-rose-500">{dessert.category}</p>
        <Link to={`/product/${dessert.id}`} className="hover:underline decoration-red decoration-2">
          <h2 className="text-base font-semibold text-rose-900">{dessert.name}</h2>
        </Link>
        <p className="text-red font-semibold">${dessert.price.toFixed(2)}</p>
      </div>
    </article>
  );
}