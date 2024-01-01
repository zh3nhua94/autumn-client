import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	/* justify-content: space-between; */
	max-width: 1320px;
	margin: 0 auto;
`;

const Products = ({ cat, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	//get products
	useEffect(() => {
		const getProducts = async () => {
			try {
				const res = await axios.get(
					cat ? `http://localhost:8800/api/products?category=${cat}` : "http://localhost:8800/api/products"
				);
				setProducts(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProducts();
	}, [cat]);

	//filters products
	useEffect(() => {
		cat &&
			setFilteredProducts(
				//filters products: every key & value should match in single product,
				//e.g: {color: "red", size: "xs"}
				products.filter((item) => {
					return Object.entries(filters).every(([key, value]) => item[key].includes(value));
				})
			);
	}, [products, cat, filters]);

	//sort products
	useEffect(() => {
		if (sort === "newest") {
			setFilteredProducts((prev) =>
				[...prev].sort((a, b) => {
					return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
				})
			);
		} else if (sort === "asc") {
			setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
		} else {
			setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
		}
	}, [sort, products]);

	return (
		<Container>
			{cat
				? filteredProducts.map((item) => (
						<Product
							item={item}
							key={item._id}
						/>
				  ))
				: products.slice(0, 8).map((item) => (
						<Product
							item={item}
							key={item._id}
						/>
				  ))}
		</Container>
	);
};

export default Products;
