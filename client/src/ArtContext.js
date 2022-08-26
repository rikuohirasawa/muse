import { createContext, useReducer } from "react";

export const ArtContext = createContext(null);

const initialState = {
    sampleArt: [],
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'set-sample-art-data': {
            return {
                ...state,
                sampleArt: action.sampleArt
            }
        } default: throw new Error ('Reducer/dispatch error')
    }
};

export const ArtContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ArtContext.Provider
            value={{
                ...state,
                dispatch
            }}>
            {children}
            </ArtContext.Provider>
    )
};