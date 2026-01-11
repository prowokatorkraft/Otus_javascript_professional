import { createBrowserRouter } from 'react-router';
import Layout from '../components/Layout';
import { homeLoader, productLoader } from './loaders';
/*import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import ProductPage from '../pages/ProductPage';
import NotFoundPage from '../pages/NotFoundPage';*/

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        //element: <HomePage />,
        lazy: async () => {
            const { default: Component } = await import("../pages/HomePage");
            return { Component };
        },
        loader: homeLoader,
      },
      {
        path: "cart",
        //element: <CartPage />,
        lazy: async () => {
            const { default: Component } = await import("../pages/CartPage");
            return { Component };
        },
      },
      {
        path: "product/:id",
        //element: <ProductPage />,
        lazy: async () => {
            const { default: Component } = await import("../pages/ProductPage");
            return { Component };
        },
        loader: productLoader,
      },
      {
        path: "*",
        //element: <NotFoundPage />,
        lazy: async () => {
            const { default: Component } = await import("../pages/NotFoundPage");
            return { Component };
        },
      },
    ],
  },
]);

