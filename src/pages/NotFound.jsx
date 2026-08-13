import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-red mb-4">404</h1>
      <h2 className="text-2xl font-bold text-rose-900 mb-6">Página no encontrada</h2>
      <p className="text-rose-500 mb-8">El producto o la página que buscas no existe.</p>
      <Link to="/" className="bg-red text-white py-3 px-8 rounded-full font-semibold hover:bg-rose-900 transition-colors">
        Volver a la tienda
      </Link>
    </div>
  );
}
