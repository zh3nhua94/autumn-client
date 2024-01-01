import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Container = styled.div``;

const Wrapper = styled.div`
	padding: 50px;
	display: flex;
	${mobile({
		padding: "10px",
		flexDirection: "column",
	})}
`;

const ImgContainer = styled.div`
	flex: 1px;
`;

const Image = styled.img`
	width: 100%;
	height: calc(90vh - 83px);
	object-fit: contain;
	${mobile({
		height: "40vh",
	})}
`;

const InfoContainer = styled.div`
	flex: 1;
	padding: 10px 50px;
	${mobile({
		padding: "10px",
	})}
`;

const Title = styled.h1`
	font-weight: 200;
`;

const Desc = styled.p`
	margin: 20px 0px;
`;

const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
`;

const FilterContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: 310px;
	justify-content: space-between;
	margin: 30px 0px;
	${mobile({
		width: "100%",
	})}
`;

const Filter = styled.div`
	display: flex;
	align-items: center;
`;

const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
`;

const FilterColor = styled.div`
	width: 20px;
	height: 20px;
	border: ${(props) => (props.$active ? "solid 2px teal" : "solid 1px #888")};
	border-radius: 50%;
	background-color: ${(props) => props.color};
	margin: 0 5px;
	cursor: pointer;
`;

const FilterSize = styled.select`
	margin-left: 10px;
	padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	max-width: 310px;
	justify-content: space-between;
	${mobile({
		width: "100%",
	})}
`;

const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
`;

const Amount = styled.span`
	width: 30px;
	height: 30px;
	border-radius: 10px;
	border: solid 1px teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 5px;
`;

const Button = styled.button`
	padding: 15px;
	border: 2px solid teal;
	background-color: white;
	cursor: pointer;
	font-weight: 500;

	&:hover {
		background-color: #f8f4f4;
		color: teal;
	}
`;

const ProductPage = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [colors, setColors] = useState("");
	const [sizes, setSizes] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get(`/products/find/${id}`);
				setProduct(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getProduct();
	}, [id]);

	const handleQuantity = (type) => {
		if (type === "dec") {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	//update cart
	const handleClick = () => {
		if (colors && sizes ? !colors || !sizes : colors ? !colors : sizes ? !sizes : true) {
			toast.error("Please select a color and size");
			return;
		}
		dispatch(addProduct({ ...product, quantity, colors, sizes }));
	};

	return (
		<Container>
			<Navbar />
			<Announcement />
			<Wrapper>
				<ImgContainer>
					<Image src={product.img} />
				</ImgContainer>
				<InfoContainer>
					<Title>{product.title}</Title>
					<Desc>{product.desc}</Desc>
					<Price>$ {product.price}</Price>
					<FilterContainer>
						{product.color?.length ? (
							<Filter>
								<FilterTitle>Color</FilterTitle>
								{product.color?.map((c) => (
									<FilterColor
										color={c}
										key={c}
										onClick={() => setColors(c)}
										$active={colors.includes(c)}
									/>
								))}
							</Filter>
						) : (
							""
						)}
						{product.size?.length ? (
							<Filter>
								<FilterTitle>Size</FilterTitle>
								<FilterSize
									onChange={(e) => setSizes(e.target.value)}
									value={sizes}
								>
									<FilterSizeOption
										disabled
										value={""}
									>
										Size
									</FilterSizeOption>
									{product.size?.map((s) => (
										<FilterSizeOption key={s}>{s}</FilterSizeOption>
									))}
								</FilterSize>
							</Filter>
						) : (
							""
						)}
					</FilterContainer>
					<AddContainer>
						<AmountContainer>
							<Remove
								style={{ cursor: "pointer" }}
								onClick={() => handleQuantity("dec")}
							/>
							<Amount>{quantity}</Amount>
							<Add
								style={{ cursor: "pointer" }}
								onClick={() => handleQuantity("inc")}
							/>
						</AmountContainer>
						<Button onClick={handleClick}>ADD TO CART</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default ProductPage;
