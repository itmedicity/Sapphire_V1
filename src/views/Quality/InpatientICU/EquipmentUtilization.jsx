import { Card } from '@mui/material'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EquipmentSelect from 'src/views/CommonCode/EquipmentSelect'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { userslno } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import moment from 'moment'
import Modelcommon from 'src/views/CommonCode/Modelcommon'
import { differenceInMinutes } from 'date-fns'

const EquipmentUtilization = () => {
    const { id } = useParams()

    // input field disable
    // const [enable, setenable] = useState(false)
    const [value, setvalue] = useState(0)
    // equipment select box
    const [distrue, setdistrue] = useState(false)

    //for userid check
    const [userid, setuserid] = useState({
        us_code: ''
    })


    //setting Intial State
    const [equipmentutiliztinData, setEquipmentUtilization] = useState({
        start_utilization: '',
        end_utilization: ''
    })
    //default state
    // const defaultstate = {
    //     start_utilization: '',
    //     end_utilization: ''
    // }
    //destrutring object
    const {
        start_utilization,
        end_utilization
    } = equipmentutiliztinData
    //select euipment selectselect
    const { selectEquipment, updateEquipment } = useContext(PayrolMasterContext)

    // date time format
    //  const [indate, setinsdate] = useState(moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss"))
    //getting data from the form 
    const updateFormData = async (e) => {
        const value = e.target.value
        setEquipmentUtilization({ ...equipmentutiliztinData, [e.target.name]: value })
    }

    var eu_timediff = differenceInMinutes(new Date(end_utilization), new Date(start_utilization))


    const postData = {
        inpt_slno: id,
        user_slno: userslno(),
        euipment_slno: selectEquipment,
        eu_starttime: start_utilization,
        eu_endtime: end_utilization,
        equiputlzn_timediff: eu_timediff,
        user_code_save: userid.us_code
    }

    // update equipment utilization time diff in indicatorcalc table

    const postData2 = {
        inpt_slno: id,
        equiputlzn_timediff: eu_timediff,

    }



    //edit
    const postDataEdit = {
        inpt_slno: value,
        user_slno: userslno(),
        euipment_slno: selectEquipment,
        eu_starttime: start_utilization,
        eu_endtime: end_utilization,
        equiputlzn_timediff: eu_timediff,
        user_code_save: userid.us_code,
    }
    //saving form data
    const submitFormData = async (e) => {
        e.preventDefault()
        const result = await axioslogin.get(`/common/user/${userid.us_code}`)
        const { success, data, message } = result.data
        if (success === 1) {
            const { user_slno } = data[0]
            const frmdataa = {
                us_code: user_slno
            }
            setuserid(frmdataa)


            if (value === 0) {
                const result = await axioslogin.post('/equipmentUtilization', postData)
                const { success, message } = result.data
                if (success === 1) {
                    const result2 = await axioslogin.patch('/equipmentUtilization/edit', postData2)
                    const { success, message } = result2.data
                    if (success === 2) {
                        succesNofity(message)
                        setdistrue(true)
                        setOpen(false);
                    } else if (success === 0) {
                        warningNofity(message)
                    } else {
                        errorNofity('Error Occured!!!Please Contact EDP')
                    }
                } else if (success === 0) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
            else {
                const result = await axioslogin.patch('/equipmentUtilization', postDataEdit)
                const { success, message } = result.data
                if (success === 2) {
                    succesNofity(message)
                    // setenable(true)
                    setdistrue(true)
                    setOpen(false)

                } else if (success === 1) {
                    warningNofity(message)
                } else {
                    errorNofity('Error Occured!!!Please Contact EDP')
                }
            }
        }
        else if (success === 2) {
            warningNofity(message)
        }
        else {
            errorNofity('Error Occured !!! Plaese Contact Edp')
        }

    }
    useEffect(() => {
        const equipmentutilzation = async () => {
            const result = await axioslogin.get(`equipmentUtilization/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                // setenable(true)
                setdistrue(true)

                const { inpt_slno,
                    euipment_slno,
                    eu_starttime,
                    eu_endtime } = data[0]

                const frmData = {
                    selectEquipment: euipment_slno,
                    start_utilization: moment(eu_starttime).format("YYYY-MM-DD[T]HH:mm:ss"),
                    end_utilization: moment(eu_endtime).format("YYYY-MM-DD[T]HH:mm:ss"),
                }
                setEquipmentUtilization(frmData)
                setvalue(inpt_slno)
                updateEquipment(euipment_slno)
            }
            else if (success === 2) {
                // setenable(false)
                setdistrue(false)
                setvalue(0)
            }
            else {
                warningNofity("Error Occured!!!Please Contact EDP")
            }
        }
        equipmentutilzation()
    }, [id, updateEquipment])
    //edit option
    const editequipmentutilization = () => {
        // setenable(false)
        setdistrue(false)
    }

    //for model close and open
    const [open, setOpen] = useState(false)
    const handleClickOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            {open === true ? <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> : null}
            {/* <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> */}
            <form onSubmit={handleClickOpen}>
                <Card className="card-body">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4 pt-2">
                                <EquipmentSelect
                                    distrue={distrue}
                                    style={{
                                        minHeight: 10,
                                        maxHeight: 27,
                                        paddingTop: 0,
                                        paddingBottom: 4,
                                    }}
                                />
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
                                // disabled={enable}

                                />
                            </div>
                            <div className="col-md-4 ">
                                <label htmlFor="test" className="form-label">Utilization End time</label>
                                <TextInput
                                    id="test"
                                    type="datetime-local"
                                    classname="form-control form-control-sm"
                                    changeTextValue={(e) => updateFormData(e)}
                                    value={end_utilization}
                                    name="end_utilization"
                                    // disabled={enable}
                                    min={start_utilization}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="card-footer">
                    <div className="col-md-12">
                        <FooterClosebtn
                            edit={editequipmentutilization}
                        />
                    </div>
                </div>
            </form >
        </Fragment >
    )
}
export default EquipmentUtilization
