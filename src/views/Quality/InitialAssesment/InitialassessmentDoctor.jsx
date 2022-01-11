import React, { Fragment, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { Card, Typography } from '@mui/material'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { axioslogin } from 'src/views/Axios/Axios'
import { userslno } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment'
import { differenceInMinutes } from 'date-fns'
import Modelcommon from 'src/views/CommonCode/Modelcommon'

const InitialassesmentDoctor = () => {
  const { id } = useParams()
  const [userid, setuserid] = useState({
    us_code: ''
  })


  //use state for enable fields on clicking edit button
  const [enable, Setenable] = useState(false)
  const [value, setValue] = useState(0)

  //   setting intial state
  const [intAssmntDoctorData, setintAssmntDoctorData] = useState({
    arrived_time: '',
    intialassessment_start: '',
    intialassessment_end: '',
    remark: '',
  })
  //   default state
  // const defaultstate = {
  //   arrived_time: '',
  //   intialassessment_start: '',
  //   intialassessment_end: '',
  //   remark: '',
  // }

  //   destructing object
  const { arrived_time,
    intialassessment_start,
    intialassessment_end,
    remark,
  } = intAssmntDoctorData

  // getting data from the form

  const updateFormData = async (e) => {
    const value = e.target.value
    setintAssmntDoctorData({ ...intAssmntDoctorData, [e.target.name]: value })

  }
  const postData = {
    inpt_slno: id,
    pt_received_time: arrived_time,
    iad_start_time: intialassessment_start,
    iad_end_time: intialassessment_end,
    iad_timediff: differenceInMinutes(new Date(intialassessment_end), new Date(arrived_time)),
    iad_remark: remark,
    user_code_save: userid,
    user_slno: userslno(),
  }
  const postDataEdit = {
    pt_received_time: arrived_time,
    iad_start_time: intialassessment_start,
    iad_end_time: intialassessment_end,
    iad_remark: remark,
    iad_timediff: differenceInMinutes(new Date(intialassessment_end), new Date(arrived_time)),
    user_slno: userslno(),
    user_code_save: userid,
    inpt_slno: value,
  }

  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.get(`/common/user/${userid}`)
    const { success, data, message } = result.data
    if (success === 1) {
      const { us_code } = data[0]
      const frmdataa = {
        us_code: us_code
      }
      setuserid(frmdataa)

      if (value === 0) {
        const result = await axioslogin.post('/initalassessmentDoc', postData)
        const { success, message } = result.data
        if (success === 1) {
          succesNofity(message)
          Setenable(true)
          setOpen(false);

        } else if (success === 0) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
      else {
        const result = await axioslogin.patch('/initalassessmentDoc', postDataEdit)
        const { success, message } = result.data
        if (success === 2) {
          succesNofity(message)
          Setenable(true)
          setOpen(false);
        } else if (success === 1) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
    } else if (success === 0) {
      warningNofity(message)
    }
    else {
      errorNofity('Error Occured!!!Please Contact EDP')
    }


  }

  useEffect(() => {
    const getinitailassessdoc = async () => {
      const result = await axioslogin.get(`initalassessmentDoc/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        Setenable(true)
        const { inpt_slno, iad_start_time, iad_end_time, iad_remark, pt_received_time } = data[0]
        const frmData = {
          arrived_time: moment(pt_received_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          intialassessment_start: moment(iad_start_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          intialassessment_end: moment(iad_end_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          remark: iad_remark
        }
        setintAssmntDoctorData(frmData)
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
    getinitailassessdoc()
  }, [id])
  const editinitialassessmentdoc = () => {
    Setenable(false)
  }
  // for model close and open

  const [open, setOpen] = useState(false);

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
      <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} />
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
                  value={arrived_time}
                  name="arrived_time"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3 pb-1">
                <Typography fontSize={16} noWrap={true} >Initial Assessment start</Typography>
                <TextInput
                  min={arrived_time}
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Initial Assessment start"
                  changeTextValue={(e) => updateFormData(e)}
                  value={intialassessment_start}
                  name="intialassessment_start"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} > Initial Assessment End</Typography>
                <TextInput
                  min={intialassessment_start}
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Initial Assessment End"
                  changeTextValue={(e) => updateFormData(e)}
                  value={intialassessment_end}
                  name="intialassessment_end"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3  pb-1">
                <Typography fontSize={16} noWrap={true} > Remark</Typography>
                <TextInput
                  classname="form-control form-control-sm"
                  Placeholder="Remark"
                  changeTextValue={(e) => updateFormData(e)}
                  value={remark}
                  name="remark"
                  disabled={enable}
                />
              </div>
            </div>
          </div>
        </Card>
        <div className="card-footer"

        >
          <div className="col-md-12">
            <FooterClosebtn
              edit={editinitialassessmentdoc}
            />
          </div>
        </div>
      </form>

    </Fragment>
  )
}

export default InitialassesmentDoctor
