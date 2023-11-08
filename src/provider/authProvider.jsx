import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

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

            // Update the state by removing the token
            return { ...state, token: null };

        // Handle other actions (if any)

        default:
            console.error(
                `You passed an action.type: ${action.type} which doesn't exist`
            );
    }

};

// Initial state for the authentication context
const initialData = {
    token: localStorage.getItem("token"),
};

// AuthProvider component to provide the authentication context to children
const AuthProvider = ({ children }) => {
    // Use reducer to manage the authentication state
    const [state, dispatch] = useReducer(authReducer, initialData);

    // Function to set the authentication token
    const setToken = (newToken) => {
        // Dispatch the setToken action to update the state
        dispatch({ type: ACTIONS.setToken, payload: newToken });
    };

    // Function to clear the authentication token
    const clearToken = () => {
        // Dispatch the clearToken action to update the state
        dispatch({ type: ACTIONS.clearToken });
    };


    const setTokenCallback = useCallback((newToken) => {
        // Dispatch the setToken action to update the state
        dispatch({ type: ACTIONS.setToken, payload: newToken });
    }, [dispatch]);

    // ...

    const sheduleTokenRefresh = useCallback(() => {
        // Define refreshToken locally within the useCallback
        const refreshToken = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                    token: state.token
                });
                const newToken = response.data.access;
                setTokenCallback(newToken);
                sheduleTokenRefresh();
            } catch (error) {
                console.error(`Falha ao conseguir refresh token: ${error}`);
            }
        };

        // Clear the previous timer if it exists
        if (state.tokenRefreshTimer) {
            clearTimeout(state.tokenRefreshTimer);
        }

        // Schedule a new timer for refreshing the token 2 minutes before it expires
        const expirationTime = state.tokenExpiration - Date.now();
        if (expirationTime > 0) {
            const timer = setTimeout(refreshToken, expirationTime - 2 * 60 * 1000);
            dispatch({ type: "setTokenRefreshTimer", payload: timer });
        }
    }, [state.token, state.tokenRefreshTimer, state.tokenExpiration, setTokenCallback]);
    
    useEffect(() => {
        // Shedule the initial token refresh
        if (state.token && state.tokenExpiration) {
            sheduleTokenRefresh()
        }
    }, [state.token, state.tokenExpiration, sheduleTokenRefresh])
    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            ...state,
            setToken,
            clearToken,
        }),
        [state]
    );

    console.log(`Context state: ${state}`)
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