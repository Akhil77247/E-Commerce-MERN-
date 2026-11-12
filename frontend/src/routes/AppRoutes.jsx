import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home"
import Product from "../pages/Product"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Cart from "../pages/Cart"
import Profile from "../pages/Profile"
import Collection from "../pages/Collection"
import Contact from "../pages/Contact"
import Orders from "../pages/Orders"
import About from "../pages/About"
import PlaceOrder from "../pages/PlaceOrder"
import NotFoundPage from "../pages/NotFoundPage"
import App from "../App";
import Verify from "../pages/Verify";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "product/:productId",
            element: <Product />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "collection",
            element: <Collection />
          },
          {
            path: "contact",
            element: <Contact />
          },
          {
            path: "orders",
            element: <Orders />
          },
          {
            path: "placeOrder",
            element: <PlaceOrder />
          },

          {
            path: "verify",
            element: <Verify />
          },

        ],
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }

]);

export default router;