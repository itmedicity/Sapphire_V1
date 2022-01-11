import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { userslno } from 'src/views/Constant/Constant'
import { Card } from '@mui/material'
import OptionSelection from 'src/views/CommonCode/OptionSelection'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import BloodComponentSelect from 'src/views/CommonCode/BloodComponentSelect'
import Accodation from '../Inpatient/Accodation';
import BloodcomponentTable from './BloodcomponentTable'
import moment from 'moment'
import Modelcommon from 'src/views/CommonCode/Modelcommon'

const Bloodcomponents = () => {
  const { id } = useParams()

  const [userid, setuserid] = useState({
    us_code: ''
  })

  //table data append
  const [bldcomptableData, setbldcomptabledata] = useState(0)

  // usestate for updation
  const [blooddataupdation, setblooddataupdation] = useState(0)

  //for model
  const [open, setOpen] = useState(false);

  const [tabledata, settabledata] = useState([{
    bld_slno: '',
    bagreq_time: '',
    bagrec_time: '',
    noofbrdrequired: '',
    noofbagreceived: '',
    noofprdct_used: '',
    noofprdct_wasted: '',
    reactn_occ: '',
    remark: '',
    bldcomponent_name: '',
    bldmast_name: ''
  }])

  // setting Intial state
  const [bloodcomponentData, setBloodcomponentData] = useState({
    noofbrdrequired: '',
    requesteddatetime: '',
    noofbagreceived: '',
    noofprdct_used: '',
    recieved_datetime: '',
    noofprdct_wasted: '',
    remarks: '',
  })

  // default state
  const defaultstate = {
    noofbrdrequired: '',
    requesteddatetime: '',
    noofbagreceived: '',
    noofprdct_used: '',
    recieved_datetime: '',
    noofprdct_wasted: '',
    remarks: '',
  }

  // destructuring object
  const {
    noofbrdrequired,
    requesteddatetime,
    noofbagreceived,
    noofprdct_used,
    recieved_datetime,
    noofprdct_wasted,
    remarks,
  } = bloodcomponentData

  // select BloodGroupSelect
  const { selectBloodGroup, updateBloodGroup, selectOption, updateOption, selectBloodComponent, updateBloodComponent } = useContext(PayrolMasterContext)

  //getting data from the form
  const updateFormData = (e) => {
    const value = e.target.value
    setBloodcomponentData({ ...bloodcomponentData, [e.target.name]: value })
  }

  const postData = {
    inpt_slno: id,
    user_slno: userslno(),
    bldmst_slno: selectBloodGroup,
    bldcomp_slno: selectBloodComponent,
    bagrequested: noofbrdrequired,
    bagreq_time: requesteddatetime,
    bagreceived: noofbagreceived,
    bagrec_time: recieved_datetime,
    bldprduct_used: noofprdct_used,
    bldprduct_wasted: noofprdct_wasted,
    reactn_occ: selectOption,
    remark: remarks,

  }

  const postDataEdit = {
    inpt_slno: blooddataupdation,
    user_slno: userslno(),
    bldmst_slno: selectBloodGroup,
    bldcomp_slno: selectBloodComponent,
    bagrequested: noofbrdrequired,
    bagreq_time: requesteddatetime,
    bagreceived: noofbagreceived,
    bagrec_time: recieved_datetime,
    bldprduct_used: noofprdct_used,
    bldprduct_wasted: noofprdct_wasted,
    reactn_occ: selectOption,
    remark: remarks,

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
      if (blooddataupdation === 0) {
        const result = await axioslogin.post('/bloodcomponents', postData)
        const { success, message } = result.data
        if (success === 1) {
          succesNofity(message)
          setBloodcomponentData(defaultstate)
          updateBloodGroup(0)
          updateBloodComponent(0)
          updateOption(0)

        } else if (success === 2) {
          warningNofity(message)
        } else {
          errorNofity('Error Occured!!!Please Contact EDP')
        }
      }
      else {
        console.log("gggg")
        console.log(postDataEdit)
        const result = await axioslogin.patch('/bloodcomponents', postDataEdit)
        const { success, message } = result.data
        if (success === 2) {
          succesNofity(message)
          setBloodcomponentData(defaultstate)
          updateBloodGroup(0)
          updateBloodComponent(0)
          updateOption(0)
        }

        else if (success === 1) {
          warningNofity(message)
        }
        else {
          errorNofity('Error Occured!!! Please contact Edp')
        }
      }
    }

    else if (success === 0) {
      warningNofity(message)
    }
    else {
      errorNofity('Error Occured!!! Please Contact Edp')
    }
  }

  //validation
  useEffect(() => {

    if (noofprdct_wasted !== '') {
      const diff = noofbagreceived - noofprdct_used
      if (noofprdct_wasted > diff) {
        warningNofity('Wasted must be  less than difference between received and used blood products')
      }
    }
  }, [noofprdct_wasted])

  // for value appending to the field
  useEffect(() => {
    const bloodcompappend = async (bldcomptableData) => {
      const result = await axioslogin.get(`bloodcomponents/getbloodcomponentappend/${bldcomptableData}`)
      const { success, data } = result.data
      if (success === 1) {
        const { bld_slno, bagreq_time, bagrec_time, bagrequested, bagreceived, bldprduct_used, bldprduct_wasted,
          reactn_occ, remark, bldcomp_slno, bldmst_slno } = data[0]
        const d1 = {
          bld_slno: bld_slno,
          requesteddatetime: moment(bagreq_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          recieved_datetime: moment(bagrec_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          // requesteddatetime: bagreq_time,
          // recieved_datetime: bagrec_time,
          noofbrdrequired: bagrequested,
          noofbagreceived: bagreceived,
          noofprdct_used: bldprduct_used,
          noofprdct_wasted: bldprduct_wasted,
          remarks: remark,
        }
        updateBloodComponent(bldcomp_slno)
        updateOption(reactn_occ)
        updateBloodGroup(bldmst_slno)
        setblooddataupdation(bld_slno)
        setBloodcomponentData(d1)
      }
    }
    if (bldcomptableData !== 0) {
      bloodcompappend(bldcomptableData)
    }
  }, [bldcomptableData, updateBloodComponent, updateOption, updateBloodGroup])

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
      {/* <form onSubmit={submitFormData}> */}
      <form onSubmit={handleClickOpen}>
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4 pt-2">
                <BloodGroupSelect
                  style={{
                    minHeight: 10,
                    maxHeight: 27,
                    paddingTop: 0,
                    paddingBottom: 4,
                  }}
                />
              </div>
              <div className="col-md-4 pt-2">
                <BloodComponentSelect
                  style={{
                    minHeight: 10,
                    maxHeight: 27,
                    paddingTop: 0,
                    paddingBottom: 4,
                  }}
                />
              </div>
              <div className="col-md-4 pt-2">
                <TextInput
                  type="number"
                  classname="form-control form-control-sm"
                  Placeholder="No of bag Requested"
                  value={noofbrdrequired}
                  name="noofbrdrequired"
                  changeTextValue={(e) => updateFormData(e)}
                />
              </div>
              <div className="col-md-3 pt-2">
                <label htmlFor="test" className="form-label">
                  Requested Date/Time
                </label>
              </div>
              <div className="col-md-3 pt-2 pl-0">
                <TextInput
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Requested date/Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={requesteddatetime}
                  name="requesteddatetime"
                />
              </div>
              <div className="col-md-3 pt-2">
                <label htmlFor="test" className="form-label">
                  Received Date/Time
                </label>
              </div>
              <div className="col-md-3 pt-2 pl-0">
                <TextInput
                  id="number"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Requested date/Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={recieved_datetime}
                  name="recieved_datetime"
                  min={requesteddatetime}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 pt-2">
                <TextInput
                  type="number"
                  classname="form-control form-control-sm"
                  Placeholder="No. of Bag Received"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofbagreceived}
                  name="noofbagreceived"
                  max={noofbrdrequired}
                />
              </div>
              <div className="col-md-4 pt-2">
                <TextInput
                  type="number"
                  classname="form-control form-control-sm"
                  Placeholder="No. Of Product Used"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofprdct_used}
                  name="noofprdct_used"
                  max={noofbagreceived}
                />
              </div>
              <div className="col-md-4 pt-2 pr-0">
                <TextInput
                  type="number"
                  classname="form-control form-control-sm"
                  Placeholder="No. of Product Wasted"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofprdct_wasted}
                  name="noofprdct_wasted"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 pt-2">
                <OptionSelection
                  // disablee={disablee}
                  style={{
                    minHeight: 10,
                    maxHeight: 27,
                    paddingTop: 0,
                    paddingBottom: 4
                  }}
                />
              </div>
              <div className="col-md-8 pt-2">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="Remarkz"
                  changeTextValue={(e) => updateFormData(e)}
                  value={remarks}
                  name="remarks"
                // disabled={enable}
                />
              </div>
            </div>
          </div>
          <Accodation style={
            {
              backgroundColor: '#EEF4F7',
              height: '10%',

            }}
          >
            <BloodcomponentTable settabledata={settabledata} tabledata={tabledata} setbldcomptabledata={setbldcomptabledata}
            />
          </Accodation>
        </Card>
        <div className="card-footer" >
          <div className="col-md-12">
            <FooterClosebtn />
          </div>
        </div>
      </form>
    </Fragment >
  )
}
export default Bloodcomponents
