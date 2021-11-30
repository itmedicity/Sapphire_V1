
import { TextField, Card } from '@mui/material'
import React, { Fragment } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PatientCard from '../Inpatient/PatientCard'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import Commonfoot from 'src/views/CommonCode/Commonfoot'
import TextInput from 'src/views/Component/TextInput'

const Bloodcomponents = () => {
    const { id } = useParams()

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card col-md-12" style={{ backgroundColor: "#e8eaf6" }} >

                <div className="card-body">
                    <div className="row"  >
                        <div className="col-md-3 col-sm-12" >
                            <PatientCard id={id} />
                        </div>

                        <div className="col-md-9  col-sm-12">

                            <div className="card"  >
                                <div className="card-header  text-black " style={{
                                    backgroundColor: "#b6b8c3"
                                }}>
                                    <h5>Blood Component
                                    </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="row">

                                                <div className="col-md-4 pt-2">
                                                    <TextInput
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    Placeholder="Component Name"
                                                // changeTextValue={}
                                                // value={data}
                                                // name=""
                                                    />
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                 <TextInput
                                                 type="text"
                                                 className="form-control form-control-sm"
                                                 Placeholder="No. Bag Requested"
                                                 />
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                    <DatetimeField
                                                        label="Requested Date"
                                                    />
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 pt-2">
                                                  <TextInput
                                                  type="text"
                                                  className="form-control form-control-sm"
                                                  Placeholder="No. of Bag Received"/>
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                   <TextInput
                                                   type="text"
                                                   className="form-control form-control-sm"
                                                  Placeholder="Product Used"
                                                  />
                                                </div>

                                                <div className="col-md-4 pt-2">
                                                    <DatetimeField
                                                        label="Received Date"
                                                    />
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 pt-2">
                                                   <TextInput
                                                   type="text"
                                                   className="form-control form-control-sm"
                                                  Placeholder="Product Used"
                                                   />
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                   <TextInput
                                                     type="text"
                                                     className="form-control form-control-sm"
                                                    Placeholder="Product Used"
                                                   />
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                <TextInput
                                                     type="text"
                                                     className="form-control form-control-sm"
                                                    Placeholder="Remark"
                                                   />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                </Card>
                                <Commonfoot />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </Fragment >
    )
}

export default Bloodcomponents
