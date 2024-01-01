import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
	margin: 20px;
	text-transform: capitalize;
`;
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
	padding: 1px;
	${mobile({
		width: "100%",
		display: "flex",
		flexDirection: "column",
	})}
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({
		marginRight: "0",
	})}
`;

const Select = styled.select`
	margin-right: 20px;
	padding: 10px;
	${mobile({
		margin: "10px 0",
	})}
`;

const Option = styled.option``;

const ProductList = () => {
	const location = useLocation();
	const cat = location.pathname.split("/")[2];
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");

	const handleFilters = (e) => {
		const value = e.target.value;
		//filters should look like {color: "red", size: "xs"}
		setFilters({
			...filters,
			[e.target.name]: value,
		});
	};

	return (
		<Container>
			<Navbar />
			<Announcement />
			<Title>{cat}</Title>
			<FilterContainer>
				<Filter>
					<FilterText>Filter Products:</FilterText>
					<Select
						name="color"
						onChange={handleFilters}
						defaultValue={"Color"}
					>
						<Option disabled>Color</Option>
						<Option value="white">White</Option>
						<Option value="black">Black</Option>
						<Option value="red">Red</Option>
						<Option value="blue">Blue</Option>
						<Option value="yellow">Yellow</Option>
						<Option value="green">Green</Option>
					</Select>
					<Select
						name="size"
						onChange={handleFilters}
						defaultValue={"Size"}
					>
						<Option disabled>Size</Option>
						<Option>XS</Option>
						<Option>S</Option>
						<Option>M</Option>
						<Option>L</Option>
						<Option>XL</Option>
					</Select>
				</Filter>
				<Filter>
					<FilterText>Sort Products:</FilterText>
					<Select
						value={sort}
						onChange={(e) => setSort(e.target.value)}
					>
						<Option value="newest">Newest</Option>
						<Option value="asc">Price (asc)</Option>
						<Option value="desc">Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products
				cat={cat}
				filters={filters}
				sort={sort}
			/>
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default ProductList;
