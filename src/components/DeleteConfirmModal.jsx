export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold text-rose-900 mb-2">¿Eliminar producto?</h2>
        <p className="text-rose-500 mb-6">
          Estás a punto de eliminar <strong>{productName}</strong>. Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 bg-rose-50 text-rose-900 py-3 rounded-full font-semibold hover:bg-rose-100 transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 bg-red text-white py-3 rounded-full font-semibold hover:bg-rose-900 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}