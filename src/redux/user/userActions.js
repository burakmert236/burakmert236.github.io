import userTypes from './userTypes';
import { login, signup } from '../../services/authServices'

export const signOut = () => async (dispatch) => {
    await localStorage.removeItem('courseplanner-token');
    dispatch({ type: userTypes.SIGN_OUT });
  };
  
export const signInSuccess = async (user) => {
	console.log(user);
	await localStorage.setItem('courseplanner-token', user.token);

	return {
		type: userTypes.SIGN_IN_SUCCESS,
		payload: user
	};
};
  
export const signInFailure = (err) => ({
	type: userTypes.SIGN_IN_FAILURE,
	payload: err
});

export const signInStart =
  (email, password, token) => async (dispatch) => {
    try {
      dispatch({ type: userTypes.SIGN_IN_START });
      const response = await login(email, password, token);
      dispatch(await signInSuccess(response));
    } catch (err) {
      if (token) dispatch(signOut);
      dispatch(signInFailure(err.message));
    }
  };

export const signUpStart =
  (email, password) => async (dispatch) => {
    try {
      dispatch({ type: userTypes.SIGN_UP_START });
      const response = await signup(email, password);
      console.log("RESPONSE", response);
      dispatch(await signInStart(null, null, response.token));
    } catch (err) {
      dispatch({ type: userTypes.SIGN_UP_FAILURE, payload: err.message });
    }
  };