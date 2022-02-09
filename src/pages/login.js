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

import { signInStart } from '../redux/user/userActions';
import { selectCurrentUser } from '../redux/user/userSelectors';
import { useNavigate } from "react-router-dom";

function LoginForm({ signInStart, currentUser }) {
  const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [seePassword, setSeePassword] = useState(false);

	const handleLogin = async () => {
		signInStart(email, password);
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
				<h3 style={{ marginTop: "-100px", marginBottom: "30px" }}>Login Form</h3>
				<div>
					<TextField
						style={{ width: "400px", marginBottom: "30px" }}
						id="email"
						label="E-mail"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
				</div>
				<div>
					<TextField
						style={{ width: "400px" }}
						id="password"
						label="Password"
						type={seePassword ? "text" : "password"}
						value={password}
						onChange={(event) => {
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
					onClick={handleLogin}
				>
					Login
				</Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
	signInStart: (email, password, token) =>
	dispatch(signInStart(email, password, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
