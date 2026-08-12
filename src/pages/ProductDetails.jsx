import { useParams } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 text-center">
      <h1 className="text-3xl font-bold text-rose-900 mb-4">Detalle del Producto</h1>
      <p className="text-rose-500">Estás viendo el producto con ID: {id}</p>
    </div>
  );
}