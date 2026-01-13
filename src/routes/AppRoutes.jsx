import { createBrowserRouter } from "react-router-dom";

/* Public */
import Home from "../pages/Home";
import About from "../pages/About";
import OurWork from "../pages/OurWork";
import Contact from "../pages/Contact";
import JoinUs from "../pages/JoinUs";
import Gallery from "../pages/Gallery";
import Donate from "../pages/Donate";

/* Admin */
import Login from "../admin/pages/Login";
import Dashboard from "../admin/pages/Dashboard";
import AdminContacts from "../admin/pages/Contacts";
import AdminJoinUs from "../admin/pages/JoinUs";
import AdminGallery from "../admin/pages/Gallery";


import ProtectedRoute from "../admin/components/ProtectedRoute";
import AdminLayout from "../admin/components/AdminLayout";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      {path: "our-work", element: <OurWork /> },
      { path: "contact", element: <Contact /> },
      { path: "join-us", element: <JoinUs /> },
      { path: "gallery", element: <Gallery /> },
      { path: "donate", element: <Donate /> },
    ],
  },

  { path: "/admin/login", element: <Login /> },

  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "contacts", element: <AdminContacts /> },
          { path: "join-us", element: <AdminJoinUs /> },
          { path: "gallery", element: <AdminGallery /> },
        ],
      },
    ],
  },
]);

export default AppRoutes;
