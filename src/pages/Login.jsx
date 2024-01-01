import React, { useRef, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
		url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	padding: 20px;
	width: 450px;
	background-color: white;
	${mobile({
		width: "80%",
	})}
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: 300;
`;

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0px;
	padding: 10px;
`;

const Button = styled.button`
	width: 100%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	margin: 10px 0;
	transition: all 0.2s ease-in;
	&:disabled {
		background-color: gray;
		cursor: not-allowed;
	}
`;

const Link = styled.a`
	margin: 5px 0;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
`;

const Error = styled.span`
	color: red;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const formRef = useRef(null);
	const { isFetching, error } = useSelector((state) => state.user);

	const handleLogin = async (e) => {
		e.preventDefault();
		if (formRef.current.reportValidity()) {
			login(dispatch, { username, password });
		}
	};

	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form ref={formRef}>
					<Input
						type="text"
						required
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Input
						type="password"
						required
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						onClick={handleLogin}
						disabled={isFetching}
					>
						LOGIN
					</Button>
					{error ? <Error>Something went wrong...</Error> : ""}
					<Link>FORGET PASSWORD?</Link>
					<Link>CREATE A NEW ACCOUNT</Link>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
