import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const initialState = {
    profileSetup: false,
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'profile-setup-complete': {
            return {
                ...state,
                profileSetup: true
            }
        } default: throw new Error ('Reducer/dispatch error')
    }
};

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider
            value={{
                ...state,
                dispatch
            }}>
            {children}
            </UserContext.Provider>
    )
};