import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Broadband } from "./pages/Broadband";
import { About } from "./pages/About";
import { Help } from "./pages/Help";
import { NotFound } from "./pages/NotFound";
import { FullFibre } from "./pages/FullFibre";
import { MeshWifi } from "./pages/MeshWifi";
import { ServiceStatus } from "./pages/ServiceStatus";
import { ContactUs } from "./pages/ContactUs";
import { CheckAvailability } from "./pages/CheckAvailability";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { AccountDashboard } from "./pages/AccountDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "broadband", Component: Broadband },
      { path: "about", Component: About },
      { path: "help", Component: Help },
      { path: "full-fibre", Component: FullFibre },
      { path: "mesh-wifi", Component: MeshWifi },
      { path: "service-status", Component: ServiceStatus },
      { path: "contact-us", Component: ContactUs },
      { path: "check-availability", Component: CheckAvailability },
      { path: "checkout", Component: Checkout },
      { path: "order-success", Component: OrderSuccess },
      { path: "dashboard", Component: AccountDashboard },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
