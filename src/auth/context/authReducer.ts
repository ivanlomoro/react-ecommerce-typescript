import { types } from "./types/types";

const authReducer = (state, action) => {

    switch (action.type) {
        case types.login:
            return {
                ...state,
                isLogged: true,
                user: action.payload
            }
        case types.logout:
            return {
                isLogged: false,
            }
        default: state;
    }
}

export default authReducer;