import React, { createContext, useState } from "react";

export const Context = createContext();
export const Provider = props => {
    const [userData, setUserData] = useState(null)

    return (
        <Context.Provider value={{
            userData, setUserData
        }}>
            {props.children}
        </Context.Provider>
    )
}
export const Consumer = Context.Consumer;

