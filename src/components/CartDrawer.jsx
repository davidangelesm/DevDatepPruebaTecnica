export default function CartDrawer({onConfirmOrder}) {
  const isEmpty = true; 

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
            {/*Items estatico para concepto de nivel 1 */}
          <div className="border-b border-rose-100 py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-rose-900 text-sm mb-1">Vanilla Beam Crème Brûlée</p>
              <div className="flex gap-4 text-sm">
                <span className="text-red font-semibold">1x</span>
                <span className="text-rose-500">@ $7.00</span>
                <span className="font-semibold text-rose-500">$7.00</span>
              </div>
            </div>
            <button className="w-5 h-5 rounded-full border border-rose-400 flex items-center justify-center hover:border-rose-900 transition-colors">
              <img src="/assets/images/icon-remove-item.svg" alt="Remove item" />
            </button>
          </div>
          
          <div className="flex justify-between items-center py-6">
            <span className="text-rose-900 text-sm">Order Total</span>
            <span className="font-bold text-2xl text-rose-900">$7.00</span>
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