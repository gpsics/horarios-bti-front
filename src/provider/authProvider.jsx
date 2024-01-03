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

            // Update the state by removing the token and reset the token refresh timer
            return { ...state, token: null, tokenRefreshTimer: null };


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
    const setToken = useCallback((newToken) => {
        // Dispatch the setToken action to update the state
        dispatch({ type: ACTIONS.setToken, payload: newToken });
    }, []);

    // Function to clear the authentication token
    const clearToken = () => {
        // Dispatch the clearToken action to update the state
        dispatch({ type: ACTIONS.clearToken });
    };

    const updateTokenInterval = useCallback(async () => {
        try {
            console.log('Token de atualização:', state.token);
            const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                refresh: state.token,
            });
            console.log('Resposta do servidor:', response);
            const newToken = response.data.access;
            setToken(newToken);
            console.log('Token atualizado com sucesso!', newToken);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Token de atualização expirado ou inválido');
                // Handle the case when the refresh token is expired or invalid
                // For example, clear the token and redirect to the login page
                clearToken();
            } else if (error.response && error.response.status === 400) {
                console.error(`Erro de solicitação inválida ao atualizar o token: ${error.message}`);
                clearToken();
                // Handle other specific cases if needed
            } else {
                console.error(`Falha ao atualizar o token: ${error.message}`);
                clearToken();
                // Handle other general errors
            }

        }
    }, [state.token, setToken]);

    useEffect(() => {
        // Inicia o intervalo de atualização do token a cada 4 minutos
        const intervalId = setInterval(updateTokenInterval, 4 * 60 * 1000);

        // Limpa o intervalo ao desmontar o componente ou quando o token é limpo
        return () => clearInterval(intervalId);
    }, [updateTokenInterval]);

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            ...state,
            setToken,
            clearToken,
        }),
        [state, setToken]
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