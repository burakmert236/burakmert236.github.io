import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Routes,
	Route
} from "react-router-dom";
import { selectCurrentUser, selectToken } from './redux/user/userSelectors';
import { signInStart } from './redux/user/userActions';

import Home from "./pages/home";
import Schedular from "./pages/schedular";
import SignupForm from "./pages/signupForm";
import LoginForm from "./pages/login";

const RoutesHandler = ({
	currentUser,
	token,
	signInStart,
}) => {

	useEffect(() => {
		const getAuth = async () => {
			const token = localStorage.getItem("courseplanner-token");
			if(token) {
				signInStart(null, null, token);
			}
		};
		getAuth();
	}, [signInStart])

	return(
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/schedular" element={<Schedular />} />
				<Route path="/signup" element={<SignupForm />} />
				<Route path="/login" element={<LoginForm />} />
			</Routes>
		</>
	);
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
	token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  	signInStart: (email, password, token) =>
    dispatch(signInStart(email, password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesHandler);