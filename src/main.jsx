import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { BrandpayCheckoutPage } from "./pages/brandpay/BrandpayCheckout";
import { FailPage } from "./pages/Fail";
import { PaymentBillingPage } from "./pages/payment/PaymentBilling";
import { PaymentCheckoutPage } from "./pages/payment/PaymentCheckout";
import { PaymentSuccessPage } from "./pages/payment/PaymentSuccess";
import { BrandpaySuccessPage } from "./pages/brandpay/BrandpaySuccess";
import { WidgetCheckoutPage } from "./pages/widget/WidgetCheckout";
import { WidgetSuccessPage } from "./pages/widget/WidgetSuccess";
import Home from "./pages/Home";
import Store from "./pages/Store";
import OrderPage from "./pages/OrderPage";
import MenuDetail from "./pages/MenuDetail";
import Cart from "./pages/Cart";
import AIRecommend from "./pages/AIRecommend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WidgetCheckoutPage />,
  },
  {
    path: "widget",
    children: [
      {
        path: "checkout",
        element: <WidgetCheckoutPage />,
      },
      {
        path: "success",
        element: <WidgetSuccessPage />,
      },
    ],
  },
  {
    path: "checkout",
    element: <WidgetCheckoutPage />,
  },
  {
    path: "brandpay",
    children: [
      {
        path: "checkout",
        element: <BrandpayCheckoutPage />,
      },
      {
        path: "success",
        element: <BrandpaySuccessPage />,
      },
    ],
  },
  {
    path: "payment",
    children: [
      {
        path: "checkout",
        element: <PaymentCheckoutPage />,
      },
      {
        path: "billing",
        element: <PaymentBillingPage />,
      },
      {
        path: "success",
        element: <PaymentSuccessPage />,
      },
    ],
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "store",
    element: <Store />,
  },
  {
    path: "menu-detail",
    element: <MenuDetail />,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "ai-recommend",
    element: <AIRecommend />,
  },
  {
    path: "fail",
    element: <FailPage />,
  },
  {
    path: "order",
    element: <OrderPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
