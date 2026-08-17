import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useProductsQueries} from '../hooks/useProductsQueries.js';
import {useProductsMutations} from '../hooks/useProductsMutations.js';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';

export default function AdminProductos() {
    const [page,setPage] = useState(1);
    const[deleteModal, setDeleteModal] = useState({isOpen:false, product:null});

    const {data, isLoading, isError} = useProductsQueries('', '', page);
    const {deleteMutation} = useProductsMutations();

    const productsList = data?.data || [];
    const totalPages = data?.totalPages || 1;

    const handleDeleteClick = (product) => {
        setDeleteModal({ isOpen: true, product });
    }

    const confirmDelete = () => {
        deleteMutation.mutate(deleteModal.product.id);
        setDeleteModal({ isOpen: false, product: null });
  };

    return (
        <div className="max-w-7xl mx-auto p-6 lg:p-10">
            <Link to="/" className="text-rose-500 hover:text-red flex items-center gap-2 mb-6 font-semibold w-max">
                ← Volver a la Tienda
            </Link>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-rose-900">Administrar Productos</h1>
                <Link to="/admin/nuevo" className="bg-red text-white py-2 px-4 rounded-full font-semibold hover:bg-rose-900 transition-colors">
                    Crear producto
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-rose-50 text-rose-50 border-b border-rose-100">
                            <tr className="bg-rose-50 text-rose-900 border-b border-rose-100">
                                <th className="p-4 font-semibold">Imagen</th>
                                <th className="p-4 font-semibold">Nombre</th>
                                <th className="p-4 font-semibold">Categoría</th>
                                <th className="p-4 font-semibold">Precio</th>
                                <th className="p-4 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-rose-500 font-semibold animate-pulse">Cargando productos...</td>
                                </tr>
                            )}
                            {isError && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-red font-semibold">Error al cargar productos</td>   
                                </tr>
                            )}
                            {!isLoading && !isError && productsList.map((product) => (
                            <tr key={product.id} className="border-b border-rose-50 hover:bg-rose-50/50 transition-colors">
                            <td className="p-4">
                                <img src={product.image.thumbnail} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            </td>
                            <td className="p-4 font-medium text-rose-900">{product.name}</td>
                            <td className="p-4 text-rose-500">{product.category}</td>
                            <td className="p-4 font-semibold text-rose-900">${Number(product.price).toFixed(2)}</td>
                            <td className="p-4">
                                <div className="flex justify-center gap-3">
                                <Link 
                                    to={`/admin/editar/${product.id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDeleteClick(product)}
                                    className="text-red hover:text-rose-900 font-medium disabled:opacity-50"
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending && deleteModal.product?.id === product.id ? 'Borrando...' : 'Eliminar'}
                                </button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                
                {!isLoading && !isError && (
                    <div className="p-4 border-t border-rose-100 flex items-center justify-between text-sm text-rose-500">
                        <button 
                        onClick={() => setPage(old => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="px-4 py-2 border border-rose-300 rounded-lg hover:bg-rose-50 disabled:opacity-50 transition-colors font-semibold"
                        >
                        Anterior
                        </button>
                        <span>Página <strong className="text-rose-900">{page}</strong> de <strong className="text-rose-900">{totalPages}</strong></span>
                        <button 
                        onClick={() => setPage(old => (old < totalPages ? old + 1 : old))}
                        disabled={page >= totalPages}
                        className="px-4 py-2 border border-rose-300 rounded-lg hover:bg-rose-50 disabled:opacity-50 transition-colors font-semibold"
                        >
                        Siguiente
                        </button>
                    </div>
                )} 
                <DeleteConfirmModal 
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, product: null })}
                    onConfirm={confirmDelete}
                    productName={deleteModal.product?.name}
                />
            </div>
        </div>
        
    )
}