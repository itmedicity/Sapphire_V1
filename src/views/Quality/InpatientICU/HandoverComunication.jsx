import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { Select, FormControl, MenuItem, Card } from '@mui/material'
import Actiontaken from 'src/views/CommonCode/Actiontaken'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { userslno } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import Modelcommon from 'src/views/CommonCode/Modelcommon'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import ShiftSelection from 'src/views/CommonCode/ShiftSelection'
import Accodation from '../Inpatient/Accodation'
import HndovrCommunicationTable from './HndovrCommunicationTable'

const HandoverComunication = () => {

  const { id } = useParams()
  const [toggle, setToggle] = useState(0)
  // const [distrue, setdistrue] = useState(false)
  const [value, setValue] = useState(0)
  const [userid, setuserid] = useState({
    us_code: ''
  })

  // for table data append
  const [handovrcmtntableData, sethandovrcmtntableData] = useState(0)

  // tabledata

  const [tabledata, settableData] = useState(
    [{
      ce_slno: '',
      ce_currdate: '',
      ce_ysno: '',
      ce_shiftdetails: '',
    }]
  )




  //intial State

  const [actiondata, setactiontaken] = useState({
    handover: '',
    errordesc: '',
    personresponsible: '',
    actiontaken: '',
    remarks: ''
  })
  //default state
  const defaultstate = {
    handover: '',
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
  } = actiondata



  const { SelectShift, updateShift } = useContext(PayrolMasterContext)

  //getting data from the form 

  const updateFormData = async (e) => {
    const value = e.target.value
    setactiontaken({ ...actiondata, [e.target.name]: value })
  }

  const postData = {
    inpt_slno: id,
    user_slno: userslno(),
    ce_ysno: toggle,
    ce_errordesc: errordesc,
    ce_prsnresponsible: personresponsible,
    ce_actntkn: actiontaken,
    ce_remark: remarks,
    ce_shiftdetails: SelectShift,
    user_save_code: userid

  }
  const postdata2 = {
    inpt_slno: id,
    handover_yn: toggle
  }
  const postDataEdit = {
    inpt_slno: value,
    user_slno: userslno(),
    ce_ysno: toggle,
    ce_errordesc: errordesc,
    ce_prsnresponsible: personresponsible,
    ce_actntkn: actiontaken,
    ce_remark: remarks,
    ce_shiftdetails: SelectShift,
    user_save_code: userid

  }

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
        const result = await axioslogin.post('/communicationerror', postData)
        const { success, message } = result.data
        if (success === 1) {
          const result2 = await axioslogin.patch('/communicationerror/edit', postdata2)
          const { success, message } = result2.data

          if (success === 2) {
            succesNofity(message)
            // setdistrue(true)
            setOpen(false);
          } else if (success === 0) {
            warningNofity(message)
          } else {
            errorNofity('Error Occured!!!Please Contact EDP')
          }
        } else if (success === 2) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
      else {
        const result = await axioslogin.patch('/communicationerror', postDataEdit)
        const { success, message } = result.data
        if (success === 2) {
          succesNofity(message)
          // setdistrue(true)
          setOpen(false)
          updateShift(0)
          setactiontaken(defaultstate)


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
  }
  useEffect(() => {
    const handovercommunictn = async () => {
      const result = await axioslogin.get(`communicationerror/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        // setdistrue(true)
        const { inpt_slno, ce_shiftdetails, ce_ysno, ce_remark, ce_prsnresponsible, ce_errordesc, ce_actntkn } = data[0]
        const frmData = {
          // handover: ce_ysno,
          errordesc: ce_errordesc,
          personresponsible: ce_prsnresponsible,
          actiontaken: ce_actntkn,
          remarks: ce_remark
        }
        setactiontaken(frmData)
        setValue(inpt_slno)
        setToggle(ce_ysno)
        updateShift(ce_shiftdetails)
      }
      else if (success === 0) {
        // setdistrue(false)
        setValue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    handovercommunictn()
  }, [id])

  const edithandovercommuication = () => {
    // setdistrue(false)
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
      <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} />
      <ToastContainer />
      <form onSubmit={handleClickOpen}>
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 pt-2">
                <ShiftSelection
                  style={{
                    minHeight: 10,
                    maxHeight: 27,
                    paddingTop: 0,
                    paddingBottom: 4
                  }} />
              </div>
              <div className="col-md-3 pt-2">
                <FormControl fullWidth margin="dense" className="mt-1">
                  <Select
                    labelId="test-select-label"
                    name="handover"
                    value={toggle}
                    size="small"
                    id="demo-simple-select"
                    onChange={(e) => {
                      setToggle(e.target.value)
                      //updateFormData(e.target.value)
                    }}
                    // disabled={distrue}
                    fullWidth
                    variant="outlined"
                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                  >
                    <MenuItem value="0">Selected Option</MenuItem>
                    <MenuItem value="1">Done</MenuItem>
                    <MenuItem value="2">Not Done</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-10 pt-2 pl-0">
                {toggle === '2' ? (
                  <Actiontaken setfunc={setactiontaken} handover={actiondata}
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

          <Accodation style={{
            background: '#EEF4F7',
            height: '10%',
          }}>
            <HndovrCommunicationTable settableData={settableData} tabledata={tabledata} sethandovrcmtntableData={sethandovrcmtntableData} />
          </Accodation>
        </Card>
        <div className="card-footer"
        // style={{
        //   backgroundColor: '#b6b8c3',
        // }}
        >
          <div className="col-md-12">
            <FooterClosebtn
              edit={edithandovercommuication}
            />
          </div>
        </div>
      </form>
    </Fragment>
  )
}
export default HandoverComunication
