import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  useNavigate,
  useRouteError,
} from "react-router";
import ErrorFallback from "./components/ErrorFallback";
import ContextWrapper from "./contexts/ContextWrapper";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Shops from "./pages/Shops";
import AddEditShop from "./pages/Shops/AddEditShop";
import Invoices from "./pages/Invoices";
import ViewInvoice from "./pages/ViewInvoice";
import ShopsListings from "./pages/Shops/ShopsListings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { PublicRoute } from "./auth/PublicRoute";
import { PrivateRoute } from "./auth/PrivateRoute";

const publicRoutes = [
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  { path: "contact", element: <Contact /> },
];

// Display Error Element
const ErrorBoundaryWrapper = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const resetErrorBoundary = () => {
    navigate(-1);
  };

  return (
    <ErrorFallback
      error={error as { message: string; stack: string }}
      resetErrorBoundary={resetErrorBoundary}
    />
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <ContextWrapper>
          <Outlet />
        </ContextWrapper>
      }
      errorElement={<ErrorBoundaryWrapper />}
    >
      {/* PublicRoute's */}
      <Route
        element={
          <PublicRoute>
            <Outlet />
          </PublicRoute>
        }
      >
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Route>

      <Route
        element={
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="shops" element={<Shops />}>
            <Route index element={<ShopsListings />} />
            <Route path="add-new-shop" element={<AddEditShop />} />
            <Route path="edit-shop/:shopId" element={<AddEditShop />} />
            <Route path=":shopId" element={<Invoices />}>
              <Route path="invoice/:invoiceId" element={<ViewInvoice />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>,
  ),
);

export default router;
