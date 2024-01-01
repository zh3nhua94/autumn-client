import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Pay from "./pages/Pay";
import ProductList from "./pages/ProductList";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import { Routes, Route, useLocation } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLayoutEffect } from "react";

const App = () => {
	const user = useSelector((state) => state.user.currentUser);
	const location = useLocation();
	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	}, [location.pathname]);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Homepage />}
				/>
				<Route
					path="/products/:category"
					element={<ProductList />}
				/>
				<Route
					path="/product/:id"
					element={<ProductPage />}
				/>
				<Route
					path="/cart"
					element={<Cart />}
				/>
				<Route
					path="/login"
					element={user ? <Homepage /> : <Login />}
				/>
				<Route
					path="/register"
					element={user ? <Homepage /> : <Register />}
				/>
				<Route
					path="/pay"
					element={<Pay />}
				/>
				<Route
					path="/success"
					element={<Success />}
				/>
			</Routes>
			<ToastContainer
				position="bottom-right"
				theme="light"
				autoClose={3000}
			/>
		</>
	);
};

export default App;
