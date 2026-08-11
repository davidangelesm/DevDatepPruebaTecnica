export default function ConfirmOrderModal({ isOpen, onStartNewOrder }) {
    if (!isOpen) return null;

    return (
            <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 sm:p-4">
                <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-10 w-full max-w-lg shadow-xl animate-fade-in flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
                <img 
                src="/assets/images/icon-order-confirmed.svg" 
                alt="Order Confirmed Icon" 
                className="w-12 h-12" 
                />  
                <h2 className="text-red font-bold text-2xl mb-4">Order Confirmed</h2>
                <p className="text-rose-900 mb-6">We Hope you enjoy your food!</p>
                {/* Resumen de productos comprados */}
                <div className="bg-rose-50 p-4 rounded-xl flex flex-col divide-y divide-rose-100 max-h-60 overflow-y-auto">
                
                <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                    <img src="/assets/images/image-creme-brulee-thumbnail.jpg" alt="Creme Brulee" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                        <h4 className="font-semibold text-rose-900 text-sm">Vanilla Beam Crème Brûlée</h4>
                        <div className="flex gap-3 text-sm mt-0.5">
                        <span className="text-red font-semibold">1x</span>
                        <span className="text-rose-500">@ $7.00</span>
                        </div>
                    </div>
                    </div>
                    <span className="font-semibold text-rose-900 text-sm">$7.00</span>
                </div>

                {/* Item 2 */}
                <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                    <img src="/assets/images/image-tiramisu-thumbnail.jpg" alt="Tiramisu" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                        <h4 className="font-semibold text-rose-900 text-sm">Classic Tiramisu</h4>
                        <div className="flex gap-3 text-sm mt-0.5">
                        <span className="text-red font-semibold">1x</span>
                        <span className="text-rose-500">@ $5.50</span>
                        </div>
                    </div>
                    </div>
                    <span className="font-semibold text-rose-900 text-sm">$5.50</span>
                </div>

                {/* Item 3 */}
                <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                    <img src="/assets/images/image-cake-thumbnail.jpg" alt="Red Velvet Cake" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                        <h4 className="font-semibold text-rose-900 text-sm">Red Velvet Cake</h4>
                        <div className="flex gap-3 text-sm mt-0.5">
                        <span className="text-red font-semibold">1x</span>
                        <span className="text-rose-500">@ $4.50</span>
                        </div>
                    </div>
                    </div>
                    <span className="font-semibold text-rose-900 text-sm">$4.50</span>
                </div>

                </div>
                <div className="flex justify-between items-center px-2">
                <span className="text-rose-900 text-sm">Order Total</span>
                <span className="font-bold text-2xl text-rose-900">$17.00</span>
                </div>
                <button
                    onClick={onStartNewOrder}
                    className="w-full bg-red text-white py-3 rounded-full font-semibold hover:bg-rose-900 transition-colors"
                >
                    Start New Order
                </button>
            </div>
        </div>
    )
}