import React, { memo, Fragment } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import TextInput from 'src/views/Component/TextInput'

const Bedoccupancycard = () => {
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
                    />

                </div>
                <div className="col-md-3 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of bed Occupied"
                    />

                </div>
                <div className="col-md-3 pt-1 pb-1" >
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of Nurses"
                    />
                </div>
                <div className="col-md-3 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of Patient"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of ventilated Nurse Patient Ratio"
                    />
                </div>
                <div className="col-md-6 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of nonventilated Nurse Patient Ratio"
                    />

                </div>

            </div>
        </Fragment >
    )
}

export default memo(Bedoccupancycard)
