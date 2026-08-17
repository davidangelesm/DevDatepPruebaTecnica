import {Routes, Route} from 'react-router-dom'
import AdminProductos from '../pages/AdminProductos.jsx';
import ProductForm from '../pages/ProductForm.jsx';
import Home from '../pages/Home.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import NotFound from '../pages/NotFound.jsx'


export default function AppRouter(){
    return(
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<AdminProductos />} />
        <Route path="/admin/nuevo" element={<ProductForm />} />
        <Route path="/admin/editar/:id" element={<ProductForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}