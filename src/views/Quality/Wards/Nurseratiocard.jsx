import React, { memo, Fragment } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import TextInput from 'src/views/Component/TextInput'

const Nurseratiocard = () => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="row">
                <div className="col-md-4 pt-1 pb-1" >
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of Nurses"
                    />
                </div>
                <div className="col-md-4 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="No.of Patient"
                    />
                </div>
                <div className="col-md-4 pt-1 pb-1">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="Nurse Patient ratio"
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default memo(Nurseratiocard)
