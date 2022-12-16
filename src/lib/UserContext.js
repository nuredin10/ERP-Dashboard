import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'

export const UserContext = React.createContext({
    user: undefined
})

export const useUser = ()=> useContext(UserContext)

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState()

    return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}