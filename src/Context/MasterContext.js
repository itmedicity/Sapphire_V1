import React, { createContext, useState } from 'react'

export const PayrolMasterContext = createContext();

const MasterContext = ({ children }) => {

    //Doctor Master Selection 
    const [selectDoctor, updateDoctor] = useState(0)
    //Equipment Master Selection
    const [selectEquipment, updateEquipment] = useState(0)
    //BloodGroup selection
    const [selectBloodGroup, updateBloodGroup] = useState(0)

    const value = {
        selectDoctor,
        updateDoctor,
        selectEquipment,
        updateEquipment,
        selectBloodGroup,
        updateBloodGroup
    }
    return <PayrolMasterContext.Provider value={value} >
        {children}
    </PayrolMasterContext.Provider>
}

export default MasterContext
