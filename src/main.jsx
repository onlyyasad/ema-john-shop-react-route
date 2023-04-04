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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Order></Order>,
    children: [
      {
        path: 'order-review',
        element: <OrderReview></OrderReview>
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
        path: '*',
        element: <h1>404 Not Found</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
