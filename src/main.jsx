import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";
/* toss */
import { BrandpayCheckoutPage } from './pages/toss/brandpay/BrandpayCheckout';
import { FailPage } from './pages/Fail';
import { PaymentBillingPage } from './pages/toss/payment/PaymentBilling';
import { PaymentCheckoutPage } from './pages/toss/payment/PaymentCheckout';
import { PaymentSuccessPage } from './pages/toss/payment/PaymentSuccess';
import { BrandpaySuccessPage } from './pages/toss/brandpay/BrandpaySuccess';
import { WidgetCheckoutPage } from './pages/toss/widget/WidgetCheckout';
import { WidgetSuccessPage } from './pages/toss/widget/WidgetSuccess';

/* auth */
import Onboarding from './pages/auth/Onboarding';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

/* customer */
import Home from './pages/customer/Home';
import Store from './pages/customer/Store';
import StoreReviews from './pages/customer/StoreReviews';
import MenuDetail from './pages/customer/MenuDetail';
import AiRecommend from './pages/customer/AiRecommend';
import Cart from './pages/customer/Cart';
import Order from './pages/customer/Order';
import OrderComplete from './pages/customer/OrderComplete';
import OrderFail from './pages/customer/OrderFail';
import OrderHistory from './pages/customer/OrderHistory';
import OrderDetail from './pages/customer/OrderDetail';
import Review from './pages/customer/Review';
import MyPage from './pages/customer/MyPage';
import AddressSheet from './pages/customer/AddressSheet';

/* owner */
import OwnerDash from './pages/owner/OwnerDash';
import OwnerSalesDetail from './pages/owner/OwnerSalesDetail';
import OwnerOrders from './pages/owner/OwnerOrders';
import OwnerMenu from './pages/owner/OwnerMenu';
import OwnerReviews from './pages/owner/OwnerReviews';
import OwnerInfo from './pages/owner/OwnerInfo';
import OwnerMyPage from './pages/owner/OwnerMyPage';

/* admin */
import Admin from './pages/admin/Admin';
import AdminUsers from './pages/admin/AdminUsers';
import AdminStores from './pages/admin/AdminStores';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminRegions from './pages/admin/AdminRegions';
import AdminAI from './pages/admin/AdminAI';
import AdminPayments from './pages/admin/AdminPayments';
import AdminReviews from './pages/admin/AdminReviews';

import NotFound from './pages/NotFound'; // 추가

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },

  // 건들지 말것
  {
    path: 'widget',
    children: [
      {
        path: 'checkout',
        element: <WidgetCheckoutPage />
      },
      {
        path: 'success',
        element: <WidgetSuccessPage />
      }
    ]
  },
  {
    path: 'checkout',
    element: <WidgetCheckoutPage />
  },
  {
    path: 'brandpay',
    children: [
      {
        path: 'checkout',
        element: <BrandpayCheckoutPage />
      },
      {
        path: 'success',
        element: <BrandpaySuccessPage />
      }
    ]
  },
  {
    path: 'payment',
    children: [
      {
        path: 'checkout',
        element: <PaymentCheckoutPage />
      },
      {
        path: 'billing',
        element: <PaymentBillingPage />
      },
      {
        path: 'success',
        element: <PaymentSuccessPage />
      }
    ]
  },

  /* auth */
  {
    path: 'auth',
    children: [
      {
        path: 'onboarding',
        element: <Onboarding />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },

  /* customer */
  {
    path: 'customer',
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'store',
        element: <Store />
      },
      {
        path: 'store-reviews',
        element: <StoreReviews />
      },
      {
        path: 'menu-detail',
        element: <MenuDetail />
      },
      {
        path: 'ai-recommend',
        element: <AiRecommend />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'order',
        element: <Order />
      },
      {
        path: 'order-complete',
        element: <OrderComplete />
      },
      {
        path: 'order-fail',
        element: <OrderFail />
      },
      {
        path: 'order-history',
        element: <OrderHistory />
      },
      {
        path: 'order-detail',
        element: <OrderDetail />
      },
      { path: 'address-sheet', element: <AddressSheet /> },
      {
        path: 'review',
        element: <Review />
      },
      {
        path: 'mypage',
        element: <MyPage />
      }
    ]
  },

  /* owner */
  {
    path: 'owner',
    children: [
      {
        path: 'dash',
        element: <OwnerDash />
      },
      {
        path: 'sales-detail',
        element: <OwnerSalesDetail />
      },
      {
        path: 'orders',
        element: <OwnerOrders />
      },
      {
        path: 'menu',
        element: <OwnerMenu />
      },
      {
        path: 'reviews',
        element: <OwnerReviews />
      },
      {
        path: 'info',
        element: <OwnerInfo />
      },
      {
        path: 'mypage',
        element: <OwnerMyPage />
      }
    ]
  },

  /* admin */
  {
    path: 'admin',
    children: [
      {
        path: '',
        element: <Admin />
      },
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: 'stores',
        element: <AdminStores />
      },
      {
        path: 'orders',
        element: <AdminOrders />
      },
      {
        path: 'categories',
        element: <AdminCategories />
      },
      {
        path: 'regions',
        element: <AdminRegions />
      },
      {
        path: 'ai',
        element: <AdminAI />
      },
      {
        path: 'payments',
        element: <AdminPayments />
      },
      {
        path: 'reviews',
        element: <AdminReviews />
      }
    ]
  },

  {
    path: 'fail',
    element: <FailPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
