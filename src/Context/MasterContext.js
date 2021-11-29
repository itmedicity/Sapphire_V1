import React, { createContext, useState } from 'react'

export const PayrolMasterContext = createContext();

const MasterContext = ({ children }) => {


    const value = {

    }
    return <PayrolMasterContext.Provider value={value} >
        {children}
    </PayrolMasterContext.Provider>
}

export default MasterContext
