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
  const [value, setValue] = useState(0)
  const [userid, setuserid] = useState({
    us_code: ''
  })
  // for table data append
  const [handovrcmtntableData, sethandovrcmtntableData] = useState(0)

  //useState for Updation
  const [handoverupdation, sethandoverupdation] = useState(0)


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
    ce_ysno: toggle == 1 ? toggle : 0,
    ce_no: toggle == 2 ? toggle : 0,
    ce_errordesc: errordesc,
    ce_prsnresponsible: personresponsible,
    ce_actntkn: actiontaken,
    ce_remark: remarks,
    ce_shiftdetails: SelectShift,
    user_save_code: userid.us_code
  }

  const postdata2 = {
    inpt_slno: id,
    handover_yn: toggle
  }

  // edit option
  const postDataEdit = {

    user_slno: userslno(),
    ce_ysno: toggle == 1 ? toggle : 0,
    ce_no: toggle == 2 ? toggle : 0,
    ce_errordesc: errordesc,
    ce_prsnresponsible: personresponsible,
    ce_actntkn: actiontaken,
    ce_remark: remarks,
    ce_shiftdetails: SelectShift,
    user_save_code: userid.us_code,
    inpt_slno: id,
  }

  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.get(`/common/user/${userid.us_code}`)
    const { success, data, message } = result.data
    if (success === 1) {
      const { us_code } = data[0]
      const frmdataa = {
        us_code: us_code
      }
      setuserid(frmdataa)
      if (handoverupdation === 0) {
        const result = await axioslogin.post('/communicationerror', postData)
        const { success, message } = result.data
        if (success === 1) {
          const result2 = await axioslogin.patch('/communicationerror/edit', postdata2)
          const { success, message } = result2.data
          // succesNofity(message)
          // setOpen(false);
          // setactiontaken(defaultstate)
          // setToggle(0)
          // updateShift(0)

          if (success === 2) {
            succesNofity(message)
            setOpen(false);
            setactiontaken(defaultstate)
            setToggle(0)
            updateShift(0)
            // warningNofity(message)
          } else if (success === 2) {
            warningNofity(message)
          }
          else {
            errorNofity('Error Occured!!!Please Contact EDP')
          }

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
      setOpen(false);
    }
    else {
      errorNofity('Error Occured!!! Please Contact EDP')
      // setOpen(false);
    }
  }


  useEffect(() => {
    const handovercommunictn = async (handovrcmtntableData) => {
      const result = await axioslogin.get(`communicationerror/getcommunication/${handovrcmtntableData}`)
      const { success, data } = result.data
      if (success === 1) {
        // setdistrue(true)
        const { ce_slno, ce_ysno, ce_remark, ce_errordesc,
          ce_prsnresponsible, ce_actntkn,
          ce_shiftdetails,
          ce_no } = data[0]
        const d1 = {
          ce_slno: ce_slno,
          ce_ysno: toggle === 1 ? toggle : 0,
          ce_no: toggle === 2 ? toggle : 0,
          remarks: ce_remark,
          errordesc: ce_errordesc,
          personresponsible: ce_prsnresponsible,
          actiontaken: ce_actntkn,
          ce_shiftdetails: ce_shiftdetails,
        }
        setactiontaken(d1)
        if (ce_ysno == 1) {
          setToggle(ce_ysno)
        }
        else if (ce_no == 2) {
          setToggle(ce_no)
        }
        else {
          setToggle(0)
        }

        // setValue(inpt_slno)
        // setToggle(ce_ysno)
        // setToggle(ce_no)


        updateShift(ce_shiftdetails)
        sethandoverupdation(d1)
      }
    }
    if (handovrcmtntableData !== 0) {
      handovercommunictn(handovrcmtntableData)
    }
  }, [handovrcmtntableData])




  const edithandovercommuication = () => {
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
      {open === true ? <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> : null}
      {/* <Modelcommon open={open} handleClose={handleClose} submit={submitFormData} setuserid={setuserid} /> */}
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
                    }}
                    // disabled={distrue}
                    fullWidth
                    variant="outlined"
                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}>
                    <MenuItem value="0">Selected Option</MenuItem>
                    <MenuItem value="1">Done</MenuItem>
                    <MenuItem value="2">Not Done</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-10 pt-2 pl-0">
                {toggle === '2' ? (
                  <Actiontaken setfunc={setactiontaken} handover={actiondata} />
                ) : (
                  <TextInput
                    type="text"
                    classname="form-control form-control-sm"
                    Placeholder="Remarks"
                    value={remarks}
                    name="remarks"
                    changeTextValue={(e) => updateFormData(e)}
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
              <HndovrCommunicationTable settableData={settableData} tabledata={tabledata} sethandovrcmtntableData={sethandovrcmtntableData} />
            </Accodation>
          </div>
        </Card>
        <div className="card-footer">
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
