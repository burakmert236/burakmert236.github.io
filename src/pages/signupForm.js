import "../style/signup.css";

import { useEffect, useState } from "react";
import { connect } from 'react-redux';

import Navbar from "../components/Navbar";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { signUpStart } from '../redux/user/userActions';
import { selectCurrentUser } from '../redux/user/userSelectors';
import { useNavigate } from "react-router-dom";

function SignupForm({ signUpStart, currentUser }) {
  const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [seePassword, setSeePassword] = useState(false);
	const [submitDisabled, setSubmitDisabled] = useState(false);
	const [helperEmailText, setHelperEmailText] = useState("Empty email.");
	const [helperPasswordText, setHelperPasswordText] = useState("Empty password.");

	const handleSignup = async () => {
		signUpStart(email, password);
	};

	useEffect(() => {
		if(currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate])

  return (
    <div>
      <Navbar />
      <div className="form-container">
				<h3 style={{ marginTop: "-100px", marginBottom: "30px" }}>Sign Up Form</h3>
				<div>
					<TextField
						style={{ width: "400px", marginBottom: "30px" }}
						color={helperEmailText === "" ? "success" : "warning"}
						id="email"
						label="E-mail"
						helperText={helperEmailText}
						value={email}
						onChange={(event) => {
							if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)) {
								setHelperEmailText("");
								if(helperPasswordText === "") setSubmitDisabled(true);
							} else {
								setSubmitDisabled(false);
								setHelperEmailText("Invalid email.");
							}
							if(event.target.value === "") setHelperEmailText("Empty email.");
							setEmail(event.target.value);
						}}
					/>
				</div>
				<div>
					<TextField
						style={{ width: "400px" }}
						color={helperPasswordText === "" ? "success" : "warning"}
						id="password"
						label="Password"
						type={seePassword ? "text" : "password"}
						helperText={helperPasswordText}
						value={password}
						onChange={(event) => {
							if(event.target.value.length >= 8) {
								setHelperPasswordText("");
								if(helperEmailText === "") setSubmitDisabled(true);
							} else {
								setSubmitDisabled(false);
								setHelperPasswordText("Password must contain at least 8 characters.");
							}
							if(event.target.value === "") setHelperPasswordText("Empty password.");
							setPassword(event.target.value)
						}}
						InputProps={{
							endAdornment: 
							<InputAdornment position="end">
								<IconButton
                  onClick={() => setSeePassword(!seePassword)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {seePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
							</InputAdornment>,
						}}
					/>
				</div>
				<Button 
					style={{ marginTop: "30px" }} 
					variant="contained" 
					disabled={!submitDisabled} 
					onClick={handleSignup}
				>
					Sign Up
				</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (email, password, token) =>
	dispatch(signUpStart(email, password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
