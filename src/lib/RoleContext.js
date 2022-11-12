import { ThemeContext } from '@emotion/react'
import React, { useContext, useState } from 'react'

export const RoleContext = React.createContext({
    role: undefined
})

export const useRole = ()=> useContext(RoleContext)

export const RoleProvider = ({children}) =>{
    const [role, setRole] = useState()

    return <RoleContext.Provider value={{role, setRole}}>{children}</RoleContext.Provider>
}