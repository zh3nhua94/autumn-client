import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { height } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/apiCalls";

const Container = styled.div`
	height: 60px;
	${mobile({
		height: "50px",
	})}
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	${mobile({
		padding: "10px",
	})}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	${mobile({
		display: "none",
	})}
`;

const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
`;

const SearchContainer = styled.div`
	border: solid 0.5px lightgray;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`;

const Center = styled.div`
	flex: 1;
	text-align: center;
`;

const Input = styled.input`
	border: none;
`;

const Logo = styled.h1`
	font-weight: bold;
	${mobile({
		fontSize: "24px	",
	})}
`;

const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({
		justifyContent: "center",
	})}
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	${mobile({
		fontSize: "12px	",
		marginLeft: "10px",
	})}
`;

const Navbar = () => {
	//get initial state of quantity in cart
	const quantity = useSelector((state) => state.cart.quantity);
	const user = useSelector((state) => state.user.currentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser(dispatch);
		navigate("/");
	};

	return (
		<Container>
			<Wrapper>
				<Left>
					<Language>English</Language>
					<SearchContainer>
						<Input placeholder="Search" />
						<SearchIcon style={{ color: "gray", fontSize: 16 }} />
					</SearchContainer>
				</Left>
				<Center>
					<Link
						to="/"
						style={{ textDecoration: "none", color: "black" }}
					>
						<Logo>AUTUMN.</Logo>
					</Link>
				</Center>
				<Right>
					{!user ? (
						<>
							<MenuItem>
								<Link
									to="/register"
									style={{ textDecoration: "none", color: "black" }}
								>
									REGISTER
								</Link>
							</MenuItem>
							<MenuItem>
								<Link
									to="/login"
									style={{ textDecoration: "none", color: "black" }}
								>
									LOGIN
								</Link>
							</MenuItem>
						</>
					) : (
						<MenuItem>
							<span onClick={handleLogout}>LOGOUT</span>
						</MenuItem>
					)}

					<MenuItem>
						<Link
							to="/cart"
							style={{ textDecoration: "none", color: "black" }}
						>
							<Badge
								badgeContent={quantity}
								color="primary"
							>
								<ShoppingCartOutlinedIcon />
							</Badge>
						</Link>
					</MenuItem>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
