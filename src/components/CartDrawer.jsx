import {useCartStore} from '../stores/cartStore.js';

export default function CartDrawer({onConfirmOrder}) {
  const {items, removeItem} = useCartStore();
  const isEmpty = items.length === 0;
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <aside className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-red font-bold text-2xl mb-6">Your Cart</h2>
      
      {isEmpty ? (
        <div className="flex flex-col items-center py-10">
          <img src="/assets/images/illustration-empty-cart.svg" alt="Empty cart" />
          <p className="text-rose-500 font-semibold mt-4">Your added items will appear here</p>
        </div>
      ) : (
        <div>
            <div className='max-h-96 overflow-y-auto pr-2'>
              {items.map((item) => (
                <div key={item.id} className="border-b border-rose-100 py-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-rose-900 text-sm mb-1">{item.name}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-red font-semibold">{item.quantity}x</span>
                      <span className="text-rose-500">@ ${item.price.toFixed(2)}</span>
                      <span className="font-semibold text-rose-500">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="w-5 h-5 rounded-full border border-rose-400 flex items-center justify-center hover:border-rose-900 transition-colors"
                  >
                    <img src="/assets/images/icon-remove-item.svg" alt="Remove item" />
                  </button>
                </div>
              ))}
            </div>
          
          <div className="flex justify-between items-center py-6">
            <span className="text-rose-900 text-sm">Order Total</span>
            <span className="font-bold text-2xl text-rose-900">${totalPrice}</span>
          </div>

          <div className="bg-rose-50 p-4 rounded-lg flex justify-center items-center gap-2 mb-6 text-sm text-rose-900">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="Carbon neutral" />
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>

          <button 
            onClick={onConfirmOrder}
            className="w-full bg-red text-white py-4 rounded-full font-semibold hover:bg-rose-900 transition-colors"
          >
            Confirm Order
          </button>
        </div>
      )}
    </aside>
  );
}