import React, { memo, Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
const Bedoccupancycard = ({ morningdata, flagsln, id }) => {

    //intial state
    const [bedutilizationicuData, setbedutilizationicuData] = useState({
        inpt_slno: 6,
        user_slno: userslno(),
        bow_flag: flagsln,
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofNurses: '',
        noofPatient: '',
        NoofventilatedNPRatio: '',
        NoofnonventilatedNPRatio: ''

    })
    const { availableBedNumber, numberofbedOccupied,
        noofNurses, noofPatient, NoofventilatedNPRatio,
        NoofnonventilatedNPRatio } = bedutilizationicuData

    const updateFormData = async (e) => {
        const value = e.target.value
        setbedutilizationicuData({ ...bedutilizationicuData, [e.target.name]: value })
        morningdata({ ...bedutilizationicuData, [e.target.name]: value })
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="row">
                <div className="col-md-3 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="Available Bed Number"
                        changeTextValue={(e) => updateFormData(e)}
                        value={availableBedNumber}
                        name="availableBedNumber"
                    />

                </div>
                <div className="col-md-3 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of bed Occupied"
                        changeTextValue={(e) => updateFormData(e)}
                        value={numberofbedOccupied}
                        name="numberofbedOccupied"
                    />

                </div>
                <div className="col-md-3 pt-1 pb-1" >
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of Nurses"
                        changeTextValue={(e) => updateFormData(e)}
                        value={noofNurses}
                        name="noofNurses"

                    />
                </div>
                <div className="col-md-3 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of Patient"
                        changeTextValue={(e) => updateFormData(e)}
                        value={noofPatient}
                        name="noofPatient"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of ventilated Nurse Patient Ratio"
                        changeTextValue={(e) => updateFormData(e)}
                        value={NoofventilatedNPRatio}
                        name="NoofventilatedNPRatio"
                    />
                </div>
                <div className="col-md-6 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of nonventilated Nurse Patient Ratio"
                        changeTextValue={(e) => updateFormData(e)}
                        value={NoofnonventilatedNPRatio}
                        name="NoofnonventilatedNPRatio"
                    />

                </div>

            </div>
        </Fragment >
    )
}

export default memo(Bedoccupancycard)
