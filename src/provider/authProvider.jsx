import axios from "axios";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import Sucess from "../Components/alerts/Sucess";
import { jwtDecode } from "jwt-decode";

// Create the authentication context
const AuthContext = createContext();

// Define the possible actions for the authReducer
const ACTIONS = {
    setToken: "setToken",
    clearToken: "clearToken",
};

// Reducer function to handle authentication state changes
const authReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.setToken:
            // Set the authentication token in axios headers and local storage
            axios.defaults.headers.common["Authorization"] = "Bearer " + action.payload;
            localStorage.setItem("token", action.payload);

            // Update the state with the new token
            return { ...state, token: action.payload };

        case ACTIONS.clearToken:
            // Clear the authentication token from axios headers and local storage
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");

            // Update the state by removing the token and reset the token refresh timer
            return { ...state, token: null, tokenRefreshTimer: null };

        default:
            console.error(`You passed an action.type: ${action.type} which doesn't exist`);
    }
};

// Initial state for the authentication context
const initialData = {
    token: localStorage.getItem("token"),
    tokenExpiration: null,
};

const getTokenExpiration = (token) => {
    try {
        const decoded = jwtDecode(token)
        if (decoded.exp) {
            return decoded.exp
        }
        return null
    } catch (error) {
        console.error("Erro ao decodificar o token:", error)
        return null
    }
}
// AuthProvider component to provide the authentication context to children
const AuthProvider = ({ children }) => {
    // Use reducer to manage the authentication state
    const [state, dispatch] = useReducer(authReducer, initialData);

    // Function to set the authentication token
    const setToken = useCallback((newToken) => {
        // Dispatch the setToken action to update the state
        dispatch({ type: ACTIONS.setToken, payload: newToken });
    }, []);

    // Function to clear the authentication token
    const clearToken = () => {
        // Dispatch the clearToken action to update the state
        dispatch({ type: ACTIONS.clearToken });
    };


    const checkTokenExpiration = useCallback(() => {
        const tokenExpiration = getTokenExpiration(state.token)
        if (tokenExpiration && tokenExpiration < Date.now() / 1000) {
            Sucess.tokenExpired().then(async (result) => {
                if (result.isConfirmed) {
                    clearToken()
                }
            })
        }
    }, [state.token])
    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            ...state,
            setToken,
            clearToken,
            checkTokenExpiration,
        }),
        [state, setToken,  checkTokenExpiration]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

// Custom hook to easily access the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
