import classNames from 'classnames'
import React, { memo, Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
import { Card } from '@mui/material'

const Bedutilizatinwardcard = ({ morningdata, flagsln, id }) => {
    //intial state
    const [bedutilizationData, setbedutilizationData] = useState({
        inpt_slno: id,
        user_slno: userslno(),
        bow_flag: flagsln,
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofNurses: '',
        noofPatient: '',
        nursePatientratio: ''
    })
    const { availableBedNumber, numberofbedOccupied, noofNurses, noofPatient, nursePatientratio } = bedutilizationData
    const updateFormData = async (e) => {
        const value = e.target.value
        setbedutilizationData({ ...bedutilizationData, [e.target.name]: value })
        morningdata({ ...bedutilizationData, [e.target.name]: value })
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form className={classNames.root}>
                <Card className="card-body">
                    <div className="row">
                        <div className="col-md-6 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="Available Bed Number"
                                changeTextValue={(e) => updateFormData(e)}
                                value={availableBedNumber}
                                name="availableBedNumber"
                            />
                        </div>
                        <div className="col-md-6 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="Number of bed Occupied"
                                changeTextValue={(e) => updateFormData(e)}
                                value={numberofbedOccupied}
                                name="numberofbedOccupied"
                            />
                        </div>
                        <div className="col-md-4 pt-1 pb-1" >
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No.of Nurses"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofNurses}
                                name="noofNurses"
                            />
                        </div>
                        <div className="col-md-4 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No.of Patient"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofPatient}
                                name="noofPatient"
                            />
                        </div>
                        <div className="col-md-4 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="Nurse Patient ratio"
                                changeTextValue={(e) => updateFormData(e)}
                                value={nursePatientratio}
                                name="nursePatientratio"
                            />
                        </div>
                    </div>
                </Card>
            </form>
        </Fragment>
    )
}

export default memo(Bedutilizatinwardcard)
