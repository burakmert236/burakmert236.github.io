import userTypes from "./userTypes";

export const INITIAL_STATE = {
    currentUser: null,
    error: false,
    token: localStorage.getItem("courseplanner-token")
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case userTypes.SIGN_IN_START: {
            return { ...state, error: false };
        }
        case userTypes.SIGN_IN_SUCCESS: {
            return {
                ...state,
                currentUser: action.payload.user,
                error: false,
                token: action.payload.token
            };
        }
        case userTypes.SIGN_IN_FAILURE: {
            return {
                ...state,
                error: action.payload
            };
          }
        case userTypes.SIGN_OUT: {
            return {
                ...state,
                currentUser: null,
                token: null
            };
        }
        case userTypes.SIGN_UP_START:
        case userTypes.SIGN_UP_FAILURE:
        default: return state;
    }
}

export default userReducer;