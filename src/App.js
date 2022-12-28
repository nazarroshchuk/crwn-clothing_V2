import { lazy, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "./store/user/user.actions";
import { Spinner } from "./components/spinner/spinner.component";

const Home = lazy(() => import("./routes/home/home.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Shop = lazy(() => import("./routes/navigation/shop/shop.component"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
