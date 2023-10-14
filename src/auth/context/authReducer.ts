import { types } from "./types/types";

export interface AuthState {
    isLogged: boolean;
    user: {
        id: number;
        name: string;
    } | null;
}

export type AuthAction = {
    type: string;
    payload?: {
        id: number;
        name: string;
    };
};


const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                isLogged: true,
                user: action.payload || null
            };
        case types.logout:
            return {
                isLogged: false,
                user: null
            };
        default:
            return state;
    }
}

export default authReducer;