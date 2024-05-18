import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout/Checkout";
import { useAppDispatch } from "./store";
import { fetchProducts } from "./store/products/products-slice";
import MainLayout from "./components/Navigation/MainLayout/MainLayout";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Gallery from "./pages/gallery/Gallery";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import ProfilePage from "./pages/profile/Profile";
import NotFound from "./pages/not-found/NotFound";

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Checkout />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
