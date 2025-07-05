import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { IUserStore } from "stores/user/types";

interface LimitedUserStore {
  isLoggedIn: boolean;
  loadingCheckLogin: string;
  isRedirected: boolean;
  updateIsRedirected: (redirect: boolean) => void;
}

const withAuth = (
  Component: React.ComponentType,
  userStore: LimitedUserStore
) => {
  return (props: any) => {
    const navigate = useNavigate();

    const location = useLocation();

    const { isLoggedIn, loadingCheckLogin, isRedirected, updateIsRedirected } =
      userStore;

    useEffect(() => {
      if (!isLoggedIn && loadingCheckLogin === "failed") {
        navigate("/login");
      }
      if (isLoggedIn && !isRedirected) {
        updateIsRedirected(true);
        navigate(location.pathname);
      }
    }, [isRedirected, isLoggedIn, loadingCheckLogin, location.pathname]);

    if (loadingCheckLogin === "loading") {
      return <Skeleton loading />;
    }
    if (!isLoggedIn && loadingCheckLogin === "failed") {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
