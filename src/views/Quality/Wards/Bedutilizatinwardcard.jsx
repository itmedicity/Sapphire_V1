import classNames from 'classnames'
import React, { memo, Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
import { Card } from '@mui/material'

const Bedutilizatinwardcard = ({ setfunc, setdta, id, disabled

}) => {
    const [nurseratioData, setnurseratioData] = useState({
        inpt_slno: id,
        user_slno: userslno(),
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofNurses: '',
        noofPatient: '',
        // nursePatientratio: ''
    })
    const { availableBedNumber, numberofbedOccupied, noofNurses, noofPatient } = nurseratioData
    const updateFormData = async (e) => {
        const value = e.target.value
        setnurseratioData({ ...nurseratioData, [e.target.name]: value })
        setfunc({ ...nurseratioData, [e.target.name]: value })
        // setfunc(nurseratioData)
    }
    useEffect(() => {

        setnurseratioData(setdta)
    }, [setdta])

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
                                disabled={disabled}
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
                                disabled={disabled}

                            />
                        </div>
                        <div className="col-md-6 pt-1 pb-1" >
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No.of Nurses"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofNurses}
                                name="noofNurses"
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-6 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No.of Patient"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofPatient}
                                name="noofPatient"
                                disabled={disabled}
                            />
                        </div>
                        {/* <div className="col-md-4 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="Nurse Patient ratio"
                                changeTextValue={(e) => updateFormData(e)}
                                value={nursePatientratio}
                                name="nursePatientratio"
                                disabled={disabled}
                            />
                        </div> */}
                    </div>
                </Card>
            </form>
        </Fragment>
    )
}

export default memo(Bedutilizatinwardcard)
