
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './About/About';
import './App.css';
import Main from './Layouts/Main';
import Shop from './Components/Shop/Shop'
import Orders from './Orders/Orders';
import Inventory from './Inventory/Inventory';
import { productsAndCartLoader } from './Loader/ProductsAndCart';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Shipping from './Shipping/Shipping';
import Privateroutes from './routes/Privateroutes';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <Shop></Shop>
        },
        {
          path: '/orders',
          loader: productsAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: '/inventory',
          element: <Privateroutes><Inventory></Inventory></Privateroutes>
        },
        {
          path: '/shipping',
          element: <Privateroutes><Shipping></Shipping></Privateroutes>
        },
        {
          path: '/about',
          element: <About></About>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/signup',
          element: <Signup></Signup>
        }
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
