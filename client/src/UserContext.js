
import { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const initialState = {
    profileSetup: false,
    userInfo: {
        profileSetup: false,
        favorites: []
    }
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'profile-setup-complete': {
            return {
                ...state,
                profileSetup: true
            }
        } case 'set-user-info': {
            return {
                ...state,
                userInfo: action.userInfo
            }
        } case 'update-user-favorites': {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    favorites: action.favorites
                }
            }
        }
        default: throw new Error ('Reducer/dispatch error')
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