import React, { Fragment, memo } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'
import TextInput from '../Component/TextInput'

const Actiontaken = () => {
    return (
        <Fragment>
            <ToastContainer />
            <SessionCheck />


            <div className="row">

                <div className="col-md-3">
                <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="Action Taken"
                    />
                </div>
                <div className="col-md-3">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="Person Responsible"
                    />
                </div>
                <div className="col-md-6">
                <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="Error Description"
                        
                    />
                </div>
            </div>


        </Fragment>
    )
}

export default memo(Actiontaken)