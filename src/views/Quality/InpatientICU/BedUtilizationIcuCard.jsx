import { Card } from '@mui/material'
import classNames from 'classnames'
import React, { Fragment, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'

const BedUtilizationIcuCard = ({ setfunc, setdta, id, disabled }) => {

    const [bedUtilizationIcuData, setbedUtilizationIcuData] = useState({
        inpt_slno: id,
        user_slno: userslno(),
        availableBedNumber: '',
        numberofbedOccupied: '',
        noofventilatedpatient: '',
        noofnurse: '',
        noofnonventipat: '',
        noofnonventinurse: ''
    })
    const { availableBedNumber, numberofbedOccupied, noofventilatedpatient, noofnurse,
        noofnonventipat, noofnonventinurse } = bedUtilizationIcuData
    const updateFormData = async (e) => {
        const value = e.target.value
        setbedUtilizationIcuData({ ...bedUtilizationIcuData, [e.target.name]: value })
        setfunc({ ...bedUtilizationIcuData, [e.target.name]: value })
        // setfunc(nurseratioData)
    }
    useEffect(() => {

        setbedUtilizationIcuData(setdta)
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
                                Placeholder="No.of Ventilated Patient"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofventilatedpatient}
                                name="noofventilatedpatient"
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-6 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No.of Nurse"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofnurse}
                                name="noofnurse"
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-6 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No Of Non Ventilated Patient"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofnonventipat}
                                name="noofnonventipat"
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-6 pt-1 pb-1">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="No Of Nurse"
                                changeTextValue={(e) => updateFormData(e)}
                                value={noofnonventinurse}
                                name="noofnonventinurse"
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </Card>
            </form>
        </Fragment>
    )
}

export default BedUtilizationIcuCard
