import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-rose-900 tracking-tight drop-shadow-sm">
        Desserts
      </h1>
      <Link 
        to="/admin" 
        className="bg-rose-100 text-rose-900 px-5 py-2.5 rounded-full font-semibold hover:bg-rose-200 transition-colors flex items-center gap-2"
      >
        Admin
      </Link>
    </header>
  );
}