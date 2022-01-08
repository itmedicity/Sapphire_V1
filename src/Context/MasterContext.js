import React, { createContext, useState } from 'react'

export const PayrolMasterContext = createContext();

const MasterContext = ({ children }) => {

    //Doctor Master Selection 
    const [selectDoctor, updateDoctor] = useState(0)
    //Equipment Master Selection
    const [selectEquipment, updateEquipment] = useState(0)
    //BloodGroup selection
    const [selectBloodGroup, updateBloodGroup] = useState(0)
    //BloodComponent selection
    const [selectBloodComponent, updateBloodComponent] = useState(0)
    //option Selection 
    const [selectOption, updateOption] = useState(0)

    const value = {
        selectDoctor,
        updateDoctor,
        selectEquipment,
        updateEquipment,
        selectBloodGroup,
        updateBloodGroup,
        selectBloodComponent,
        updateBloodComponent,
        selectOption,
        updateOption


    }
    return <PayrolMasterContext.Provider value={value} >
        {children}
    </PayrolMasterContext.Provider>
}

export default MasterContext
