import {useCartStore} from '../stores/cartStore.js';

export default function ConfirmOrderModal({ isOpen, onStartNewOrder }) {

    const {items, clearCart} = useCartStore();

    if (!isOpen) return null;

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    const handleStartNewOrder = () => {
        clearCart();
        onStartNewOrder();
    }

    return (
            <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 sm:p-4">
                <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-10 w-full max-w-lg shadow-xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
                <img 
                src="/assets/images/icon-order-confirmed.svg" 
                alt="Order Confirmed Icon" 
                className="w-12 h-12" 
                />  
                <h2 className="text-red font-bold text-2xl mb-4">Order Confirmed</h2>
                <p className="text-rose-900 mb-6">We Hope you enjoy your food!</p>
                {/* Resumen de productos comprados */}
                <div className="bg-rose-50 p-6 rounded-xl flex flex-col gap-4">
                <div className="max-h-60 overflow-y-auto pr-2">
                    {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b border-rose-100 py-4 last:border-0">
                        <div className="flex items-center gap-4">
                        <img src={item.image.thumbnail} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                            <div>
                                <h4 className="font-semibold text-rose-900 text-sm truncate w-32 md:w-48">{item.name}</h4>
                                <div className="flex gap-3 text-sm mt-1">
                                    <span className="text-red font-semibold">{item.quantity}x</span>
                                    <span className="text-rose-500">@ ${item.price.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <span className="font-semibold text-rose-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    ))}
                </div>

                </div>
                <div className="flex justify-between items-center px-2">
                <span className="text-rose-900 text-sm">Order Total</span>
                <span className="font-bold text-2xl text-rose-900">${totalPrice}</span>
                </div>
                <button
                    onClick={handleStartNewOrder}
                    className="w-full bg-red text-white py-3 rounded-full font-semibold hover:bg-rose-900 transition-colors"
                >
                    Start New Order
                </button>
            </div>
        </div>
    )
}