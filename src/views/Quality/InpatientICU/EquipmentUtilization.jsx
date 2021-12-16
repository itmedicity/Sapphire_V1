import { Card } from '@mui/material'
import React, { Fragment, useState, useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import PatientCard from '../Inpatient/PatientCard'
import { useHistory, useParams } from 'react-router'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import EquipmentSelect from 'src/views/CommonCode/EquipmentSelect'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { axioslogin } from 'src/views/Axios/Axios'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { userslno } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const EquipmentUtilization = () => {
    const { id } = useParams()
    const classes = useStyles()
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home/InpatientEdit/${id}`)
    }
    //setting initial state
    const [equipmentutiliztinData, setequipmentData] = useState({
        start_utilization: '',
        end_utilization: ''
    })
    //defaultb state
    const defaultstate = {
        start_utilization: '',
        end_utilization: ''
    }

    //destrutring object
    const {
        start_utilization,
        end_utilization
    } = equipmentutiliztinData

    //select doctorselect
    const { selectEquipment, updateEquipment } = useContext(PayrolMasterContext)


    //getting data from the form 

    const updateFormData = async (e) => {
        const value = e.target.value
        setequipmentData({ ...equipmentutiliztinData, [e.target.name]: value })
    }

    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        euipment_slno: selectEquipment,
        eu_starttime: start_utilization,
        eu_endtime: end_utilization

    }
    //saving form data
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/equipmentUtilization', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setequipmentData(defaultstate)
            updateEquipment(0)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity('Error Occured!!!Please Contact EDP')
        }
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <form className={classes.root} onSubmit={submitFormData}>
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
                                                    <div className="col-md-4">
                                                        <EquipmentSelect />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="test" className="form-label">Utilization Start time</label>
                                                        <TextInput
                                                            id="test"
                                                            type="datetime-local"
                                                            classname="form-control form-control-sm"
                                                            Placeholder="Utilization"
                                                            changeTextValue={(e) => updateFormData(e)}
                                                            value={start_utilization}
                                                            name="start_utilization"
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="test" className="form-label">Utilization End time</label>
                                                        <TextInput
                                                            id="test"
                                                            type="datetime-local"
                                                            classname="form-control form-control-sm"
                                                            changeTextValue={(e) => updateFormData(e)}
                                                            value={end_utilization}
                                                            name="end_utilization"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2"></div>
                                        </div>
                                    </Card>
                                    <div className="card-footer text-muted" style={{
                                        backgroundColor: "#b6b8c3"
                                    }}>
                                        <FooterClosebtn
                                            redirect={RedirectToProfilePage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
export default EquipmentUtilization
