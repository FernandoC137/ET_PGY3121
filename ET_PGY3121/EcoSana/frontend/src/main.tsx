import React, { useEffect, useState, ComponentType } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  SobreNosotros,
  Tienda,
  Galeria,
  Contacto,
  Login,
  SignUp,
  Account,
  Terms,
  Carrito,
  Checkout,
  AdminPage,
  OtherPages,
  CatalogManagement,
} from "./routes";

interface PrivateRouteProps {
  component: ComponentType<unknown>;
}

// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return isLoggedIn ? <Component {...rest} /> : <Login />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <OtherPages />,
  },
  {
    path: "/SobreNosotros",
    element: <SobreNosotros />,
  },
  {
    path: "/Tienda",
    element: <PrivateRoute component={Tienda}/>,
  },
  {
    path: "/Galeria",
    element: <Galeria />,
  },
  {
    path: "/Contacto",
    element: <Contacto />,
  },
  {
    path: "/Carrito",
    element: <PrivateRoute component={Carrito} />,
  },
  {
    path: "/Checkout",
    element: <PrivateRoute component={Checkout} />,
  },
  {
    path: "/Account",
    element: <PrivateRoute component={Account} />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/AdminPage",
    element: <PrivateRoute component={AdminPage} />,
  },
  {
    path: "/CatalogManagement",
    element: <PrivateRoute component={CatalogManagement} />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/Terms",
    element: <Terms />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
