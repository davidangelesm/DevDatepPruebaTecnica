import QuantityStepper from './QuantityStepper';

export default function ProductCard({ dessert, isActive }) {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative">
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

        {/* Contenedor absoluto centrado en la parte inferior */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-40">
          {isActive ? (
            <QuantityStepper quantity={1} />
          ) : (
            <button className="w-full bg-white border border-rose-400 rounded-full py-2.5 px-4 flex items-center justify-center gap-2 hover:border-red hover:text-red transition-colors font-semibold text-rose-900 text-sm">
              <img src="/assets/images/icon-add-to-cart.svg" alt="Add to cart icon" />
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Información del producto (margen superior para compensar el botón absoluto) */}
      <div className="mt-4">
        <p className="text-sm text-rose-500">{dessert.category}</p>
        <h2 className="text-base font-semibold text-rose-900">{dessert.name}</h2>
        <p className="text-red font-semibold">${dessert.price.toFixed(2)}</p>
      </div>
    </article>
  );
}