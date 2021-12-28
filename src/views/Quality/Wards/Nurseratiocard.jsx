import React, { memo, Fragment, useState } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import TextInput from 'src/views/Component/TextInput'
import { userslno } from 'src/views/Constant/Constant'
import { Card } from '@mui/material'

const Nurseratiocard = ({ setfunc, id }) => {
    const [nurseratioData, setnurseratioData] = useState({
        inpt_slno: id,
        user_slno: userslno(),
        noofNurses: '',
        noofPatient: '',
        nursePatientratio: ''
    })
    const { noofNurses, noofPatient, nursePatientratio } = nurseratioData
    const updateFormData = async (e) => {
        const value = e.target.value
        setnurseratioData({ ...nurseratioData, [e.target.name]: value })
        setfunc({ ...nurseratioData, [e.target.name]: value })
        // setfunc(nurseratioData)
    }


    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form>
                <div className="row">
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
            </form>

        </Fragment>
    )
}

export default memo(Nurseratiocard)
