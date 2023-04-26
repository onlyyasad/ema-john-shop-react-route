import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Order from './component/Order';
import OrderReview from './component/OrderReview';
import ManageInventory from './component/ManageInventory';
import Login from './component/Login';
import Home from './component/Home';
import cartProductsLoader from './loaders/productLoaders';
import Checkout from './component/Checkout';
import Register from './component/Register';
import AuthProviders from './providers/AuthProviders';
import PrivateRoute from './component/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/',
        element: <Order></Order>,
        loader: cartProductsLoader
      },
      {
        path: 'order-review',
        element: <OrderReview></OrderReview>,
        loader: cartProductsLoader
      },
      {
        path: 'checkout',
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: 'manage-inventory',
        element: <ManageInventory></ManageInventory>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: '*',
        element: <h1>404 Not Found</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router}></RouterProvider>
    </AuthProviders>
  </React.StrictMode>,
)
