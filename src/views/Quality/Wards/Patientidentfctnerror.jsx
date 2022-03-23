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
import PatientidentifactionTable from './PatientidentifactionTable'
import Accodation from '../Inpatient/Accodation'
// import { useStyles } from 'src/views/CommonCode/MaterialStyle'

//a table is here for updation 
//


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

  // for table data append
  const [patentidenterroeData, setpatenterrorData] = useState(0)

  // useState for updation

  const [patientupdation, setpatientupdation] = useState(0)


  // tabledata
  const [tabledata, settableData] = useState(
    [{
      pie_slno: '',
      pie_currentdate: '',
      pie_ysno: '',
      pie_no: ''
    }]
  )


  // initial state
  const [patientidentdata, setpatientidentdata] = useState({
    patientidentification: '',
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: ''
  })
  //default state

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
      if (patientupdation === 0) {
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
  useEffect(() => {
    const patientidentierror = async (patentidenterroeData) => {
      const result = await axioslogin.get(`patientIdenticationError/getpatienterror/${patentidenterroeData}}`)
      const { success, data } = result.data
      if (success === 1) {
        const { pie_slno, pie_ysno, pie_remark, pie_errordesc,
          pie_prsnresponsible, pie_actntkn, pie_no } = data[0]
        const d1 = {
          pie_slno: pie_slno,
          pie_ysno: toggle === 1 ? toggle : 0,
          pie_no: toggle === 2 ? toggle : 0,
          remarks: pie_remark,
          errordesc: pie_errordesc,
          personresponsible: pie_prsnresponsible,
          actiontaken: pie_actntkn,
        }
        setpatientidentdata(d1)
        if (pie_ysno == 1) {
          setToggle(pie_ysno)
        }
        else if (pie_no == 2) {
          setToggle(pie_no)
        }
        else {
          setToggle(0)
        }
        setpatientupdation(d1)
      }

    }
    if (patentidenterroeData !== 0) {
      patientidentierror(patentidenterroeData)
    }
  }, [patentidenterroeData])

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
      {open === true ? <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> : null}

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
          <div className="col-md-12 pt-2 pl-0">
            <Accodation style={{
              background: '#EEF4F7',
              height: '10%',
            }}>
              <PatientidentifactionTable settableData={settableData} tabledata={tabledata} setpatenterrorData={setpatenterrorData} />

            </Accodation>
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
