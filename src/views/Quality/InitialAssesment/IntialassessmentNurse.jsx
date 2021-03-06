import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { Card, Typography } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { differenceInMinutes } from 'date-fns'
import Modelcommon from 'src/views/CommonCode/Modelcommon'

const IntialassessmentNurse = () => {
  // const [model, Setmodel] = useState(0)
  const { id } = useParams()
  const [userid, setuserid] = useState({
    us_code: ''
  })
  //use state for enable fields on clicking edit button
  const [enable, Setenable] = useState(false)
  const [value, setValue] = useState(0)
  //   setting intial state
  const [intAssmntNurseData, setintAssmntNurseData] = useState({
    arrived_time_ns: '',
    initialassemnt_startns: '',
    initialassemnt_endns: '',
    remarkns: '',
  })
  //  destructing object
  const { arrived_time_ns,
    initialassemnt_startns,
    initialassemnt_endns,
    remarkns,
  } = intAssmntNurseData
  // getting data from the form
  const updateFormData = async (e) => {
    const value = e.target.value
    setintAssmntNurseData({ ...intAssmntNurseData, [e.target.name]: value })
  }
  var ia_timediffnurstn = differenceInMinutes(new Date(initialassemnt_endns), new Date(arrived_time_ns))

  const postData = {
    inpt_slno: id,
    pt_receivetime: arrived_time_ns,
    ia_startnstime: initialassemnt_startns,
    ia_endnstime: initialassemnt_endns,
    ia_timediffnurstn: ia_timediffnurstn,
    ian_remark: remarkns,
    user_code_save: userid.us_code,
    user_slno: userslno()
  }
  // update dtata for time difference in indicatorcalculation table 
  const postData2 = {
    inpt_slno: id,
    initalass_nurse_diff: ia_timediffnurstn,
  }
  const postDataEdit = {
    pt_receivetime: arrived_time_ns,
    ia_startnstime: initialassemnt_startns,
    ia_endnstime: initialassemnt_endns,
    ia_timediffnurstn: ia_timediffnurstn,
    ian_remark: remarkns,
    user_slno: userslno(),
    user_code_save: userid.us_code,
    inpt_slno: value,
  }
  console.log(value)
  //saving form data // to get the use details // checking condition for insert the data    or update the data 
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
        const result = await axioslogin.post('/assesmentnurse', postData)
        const { success, message } = result.data
        if (success === 1) {
          const result2 = await axioslogin.patch('/assesmentnurse/edit', postData2)
          const { success, message } = result2.data
          if (success === 2) {
            succesNofity(message)
            Setenable(true)
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
        console.log(postDataEdit)
        const result = await axioslogin.patch('/assesmentnurse', postDataEdit)
        const { success, message } = result.data
        if (success === 2) {
          const result2 = await axioslogin.patch('/assesmentnurse/edit', postData2)
          const { success, message } = result2.data
          if (success === 2) {
            succesNofity(message)
            Setenable(true)
            setOpen(false);
          } else if (success === 0) {
            warningNofity(message)
          } else {
            errorNofity('Error Occured!!!Please Contact EDP')
          }
        } else if (success === 1) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
    }
    else if (success === 0) {
      warningNofity(message)
    }
    else {
      errorNofity('Error Occured!!! Please Contact EDP')
    }
    //   // Setmodel(1)
  }
  // useeffect for the data input fileds

  useEffect(() => {
    const getinitailassessnurse = async () => {
      const result = await axioslogin.get(`assesmentnurse/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        Setenable(true)
        const { inpt_slno, pt_receivetime, ia_startnstime, ia_endnstime, ian_remark } = data[0]
        const frmData = {
          arrived_time_ns: moment(pt_receivetime).format("YYYY-MM-DD[T]HH:mm:ss"),
          initialassemnt_startns: moment(ia_startnstime).format("YYYY-MM-DD[T]HH:mm:ss"),
          initialassemnt_endns: moment(ia_endnstime).format("YYYY-MM-DD[T]HH:mm:ss"),
          remarkns: ian_remark
        }
        setintAssmntNurseData(frmData)
        setValue(inpt_slno)
      }
      else if (success === 0) {
        Setenable(false)
        setValue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    getinitailassessnurse()
  }, [id])
  const editinitialassessment = () => {
    Setenable(false)
  }
  // for model
  const [open, setOpen] = useState(false);
  const handleClickOpen = (e) => {
    e.preventDefault()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // their is a common  'Model common' for save with user id
  return (
    <Fragment>
      <SessionCheck />
      {open === true ? <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> : null}
      <ToastContainer />
      <form onSubmit={handleClickOpen}>
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} >Arrived Time</Typography>
                <TextInput
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Arrived Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={arrived_time_ns}
                  name="arrived_time_ns"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} >Initial Assessment Start</Typography>
                <TextInput
                  min={arrived_time_ns}
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Initial Assessment start"
                  changeTextValue={(e) => updateFormData(e)}
                  value={initialassemnt_startns}
                  name="initialassemnt_startns"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} >Initial Assessment End</Typography>
                <TextInput
                  min={initialassemnt_startns}
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Initial Assessment End"
                  changeTextValue={(e) => updateFormData(e)}
                  value={initialassemnt_endns}
                  name="initialassemnt_endns"
                  disabled={enable}
                />
              </div>
              <div className="col-md-2  pb-1">
                <Typography fontSize={16} noWrap={true} >Remarks</Typography>
                <TextInput classname="form-control form-control-sm" Placeholder="Remark"
                  changeTextValue={(e) => updateFormData(e)}
                  value={remarkns}
                  name="remarkns"
                  disabled={enable} />
              </div>
            </div>
          </div>
        </Card>
        <div className="card-footer" >
          <div className="col-md-12 p-0">
            <FooterClosebtn
              edit={editinitialassessment} />
          </div>
        </div>
      </form>
    </Fragment>
  )
}
export default IntialassessmentNurse
