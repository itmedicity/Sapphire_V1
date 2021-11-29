import { Card } from '@mui/material'
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import PatientCard from '../Inpatient/PatientCard'
import { useParams } from 'react-router'
import SessionCheck from 'src/views/Axios/SessionCheck'
import DatetimeField from 'src/views/CommonCode/DatetimeField'
import Commonfoot from 'src/views/CommonCode/Commonfoot';
import EquipmentSelect from 'src/views/CommonCode/EquipmentSelect'

const EquipmentUtilization = () => {
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
                                    <h5>Equipment Utilization
                                    </h5>
                                </div>
                                <Card className="card-body">
                                    <div className="row">
                                        <div className="col-md-2"></div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-4 pt-2">
                                                    <EquipmentSelect />
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                    <DatetimeField
                                                        label="Utilization Start Time"
                                                    />
                                                </div>
                                                <div className="col-md-4 pt-2">
                                                    <DatetimeField
                                                        label="Utilization End Time"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2"></div>
                                    </div>
                                </Card>
                                {/* Load a footer component */}
                                <Commonfoot id={id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default EquipmentUtilization
