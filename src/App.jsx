import {toast, Toaster} from 'react-hot-toast';
import AppRouter from './routes/AppRouter';


export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <AppRouter/>
    </>
  )
}