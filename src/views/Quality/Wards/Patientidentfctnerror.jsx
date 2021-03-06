import React, { Fragment, useState, useEffect } from 'react'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { ToastContainer } from 'react-toastify'
import { useParams } from 'react-router'
import { MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import { FormControl, Select } from '@material-ui/core'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import Modelcommon from 'src/views/CommonCode/Modelcommon'
// import { useStyles } from 'src/views/CommonCode/MaterialStyle'

const Patientidentfctnerror = () => {
  const { id } = useParams()
  // const [distrue, setdistrue] = useState(true)
  const [toggle, setToggle] = useState(0)
  const [value, setValue] = useState(0)
  const [userid, setuserid] = useState({
    us_code: ''
  })

  //for model
  const [open, setOpen] = useState(false);

  const [patientidentdata, setpatientidentdata] = useState({
    patientidentification: '',
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: ''
  })


  const defaultstate = {
    patientidentification: '',
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: ''
  }

  //destrutring object
  const {
    errordesc,
    personresponsible,
    actiontaken,
    remarks
  } = patientidentdata

  //getting data from the form 

  const updateFormData = async (e) => {
    const value = e.target.value
    setpatientidentdata({ ...patientidentdata, [e.target.name]: value })
  }

  const postData = {
    inpt_slno: id,
    user_slno: userslno(),
    pie_ysno: toggle == 1 ? toggle : 0,
    pie_no: toggle == 2 ? toggle : 0,
    pie_errordesc: errordesc,
    pie_prsnresponsible: personresponsible,
    pie_actntkn: actiontaken,
    pie_remark: remarks,
    user_code_save: userid.us_code

  }

  const postData2 = {
    inpt_slno: id,
    ptntidntfnerror_yn: toggle,
  }

  const postDataEdit = {
    inpt_slno: value,
    user_slno: userslno(),
    pie_ysno: toggle == 1 ? toggle : 0,
    pie_no: toggle == 2 ? toggle : 0,
    pie_errordesc: errordesc,
    pie_prsnresponsible: personresponsible,
    pie_actntkn: actiontaken,
    pie_remark: remarks,
    user_code_save: userid.us_code

  }
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
        const result = await axioslogin.post('/patientIdenticationError', postData)
        const { success, message } = result.data
        if (success === 1) {
          const result2 = await axioslogin.patch('/patientIdenticationError/edit', postData2)
          const { success, message } = result2.data
          if (success === 2) {
            succesNofity(message)
            setOpen(false)
            setpatientidentdata(defaultstate)
            setToggle(0)
            //setactiontaken(defaultstate)
          }

        } else if (success === 2) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }

      else {
        const result = await axioslogin.patch('/patientIdenticationError', postDataEdit)
        const { success, message } = result.data
        if (success === 2) {
          succesNofity(message)
          setOpen(false)
          setpatientidentdata(defaultstate)

        } else if (success === 1) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
    }
    else if (success === 0) {
      warningNofity(message)
    } else {
      errorNofity('Error Occured!!! Plaese contact Edp')
    }

  }

  // useEffect(() => {
  //   const patientidentierror = async () => {
  //     const result = await axioslogin.get(`patientIdenticationError/${id}`)
  //     const { success, data } = result.data
  //     if (success === 1) {
  //       const { inpt_slno, pie_ysno, pie_remark, pie_errordesc, pie_prsnresponsible, pie_actntkn } = data[0]
  //       setToggle(pie_ysno)
  //       const frmData = {
  //         patientidentification: pie_ysno,
  //         errordesc: pie_errordesc,
  //         personresponsible: pie_prsnresponsible,
  //         actiontaken: pie_actntkn,
  //         remarks: pie_remark
  //       }
  //       setpatientidentdata(frmData)
  //       setValue(inpt_slno)
  //     }
  //     else if (success === 0) {
  //       // setdistrue(false)
  //       setValue(0)
  //     }
  //     else {
  //       warningNofity("Error Occured!!!Please Contact EDP")
  //     }
  //   }
  //   patientidentierror()
  // }, [id])

  const editpatientidentification = () => {
    // setdistrue(false)
  }


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
      <form
        onSubmit={handleClickOpen}
      >
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-2 pt-2">
                <FormControl fullWidth margin="dense" className="mt-1">
                  <Select
                    labelId="test-select-label"
                    name="patientidentification"
                    value={toggle}
                    size="small"
                    id="demo-simple-select"
                    onChange={(e) => {
                      setToggle(e.target.value)
                    }}
                    fullWidth
                    // disabled={distrue}
                    variant="outlined"
                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                  >
                    <MenuItem value="0">Selected Option</MenuItem>
                    <MenuItem value="1">Done</MenuItem>
                    <MenuItem value="2">Not Done</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-10 pt-2">
                {toggle === '2' ? (
                  <Actiontaken setfunc={setpatientidentdata} handover={patientidentdata}
                  // distrue={distrue} 
                  />
                ) : (
                  <TextInput
                    type="text"
                    classname="form-control form-control-sm"
                    Placeholder="Remarks"
                    value={remarks}
                    name="remarks"
                    changeTextValue={(e) => updateFormData(e)}
                  // disabled={distrue}
                  />
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="card-footer"
        // style={{
        //   backgroundColor: '#b6b8c3',
        // }}
        >
          <div className="col-md-12">
            <FooterClosebtn
              edit={editpatientidentification} />
          </div>
        </div>
      </form>
    </Fragment>
  )
}

export default Patientidentfctnerror
