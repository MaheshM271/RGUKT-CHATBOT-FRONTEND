import { Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/login";
import { SignUp } from "./components/auth/signup";
import { Home } from "./components/home";
import withAuth from "./utils/index";
import { Suspense } from "react";
import { ConfigProvider, Skeleton } from "antd";
import { Slider } from "components/slider";
import { observer } from "mobx-react";
import useStores from "stores/useStores";

export const App = observer(() => {
  const stores = useStores();
  const { isLoggedIn, loadingCheckLogin, isRedirected, updateIsRedirected } =
    stores.userStore;
  const limitedUserStore = {
    isLoggedIn,
    loadingCheckLogin,
    isRedirected,
  };

  const ProtectedHome = withAuth(Home, {
    ...limitedUserStore,
    updateIsRedirected,
  });

  return (
    <Suspense fallback={<Skeleton active />}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorErrorBorder: "#CE5B52",
              colorError: "#CE5B52",
              colorErrorText: "#CE5B52",
              colorTextPlaceholder: "#d9d9d9",
              colorBorder: "#d9d9d9",
            },
          },
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/slide-check" element={<Slider />} />
          <Route path="/" element={<ProtectedHome />} />
          <Route path="*" element={<ProtectedHome />} />
        </Routes>
      </ConfigProvider>
    </Suspense>
  );
});
