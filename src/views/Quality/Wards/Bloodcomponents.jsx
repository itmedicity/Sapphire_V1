import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import TextInput from 'src/views/Component/TextInput'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { userslno } from 'src/views/Constant/Constant'
import { Card, Chip, IconButton } from '@mui/material'
import OptionSelection from 'src/views/CommonCode/OptionSelection'
import { MdOutlineAddTask } from 'react-icons/md'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import moment from 'moment'

const Bloodcomponents = () => {
  const { id } = useParams()
  const history = useHistory()
  // const [distrue, setdistrue] = useState(false)
  // const [indate, setinsdate] = useState(moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss"))


  //use state for enable fields on clicking edit button
  const [enable, Setenable] = useState(false)
  const [value, setValue] = useState(0)


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
  const { selectBloodGroup, updateBloodGroup } = useContext(PayrolMasterContext)

  //select reaction occured option
  const { selectOption, updateOption } = useContext(PayrolMasterContext)

  //getting data from the form
  const updateFormData = (e) => {
    const value = e.target.value
    setBloodcomponentData({ ...bloodcomponentData, [e.target.name]: value })
  }

  const postData = {
    inpt_slno: id,
    user_slno: userslno(),
    bldmst_slno: selectBloodGroup,
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
    inpt_slno: value,
    user_slno: userslno(),
    bldmst_slno: selectBloodGroup,
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
    if (value === 0) {
      const result = await axioslogin.post('/bloodcomponents', postData)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        Setenable(true)
      } else if (success === 2) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
    else {
      const result = await axioslogin.patch('/bloodcomponents/edit', postDataEdit)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        Setenable(true)
      } else if (success === 2) {
        warningNofity(message)
      } else {
        errorNofity('Error Occured!!!Please Contact EDP')
      }
    }
  }

  useEffect(() => {
    const bloodcomponent = async () => {
      const result = await axioslogin.get(`bloodcomponents/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        Setenable(true)
        const { inpt_slno, bldmst_slno, bagrequested, bagreq_time, bagreceived, bagrec_time, bldprduct_used, bldprduct_wasted, reactn_occ, remark } = data[0]
        updateBloodGroup(bldmst_slno)
        updateOption(reactn_occ)
        const frmData = {
          noofbrdrequired: bagrequested,
          requesteddatetime: moment(bagreq_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          noofbagreceived: bagreceived,
          noofprdct_used: bldprduct_used,
          recieved_datetime: moment(bagrec_time).format("YYYY-MM-DD[T]HH:mm:ss"),
          noofprdct_wasted: bldprduct_wasted,
          remarks: remark,
        }
        setBloodcomponentData(frmData)
        setValue(inpt_slno)
      }
      else if (success === 2) {
        Setenable(false)
        setValue(0)
      }
      else {
        warningNofity("Error Occured!!!Please Contact EDP")
      }
    }
    bloodcomponent()
  }, [id])
  const editbloodcompnt = () => {
    Setenable(false)
  }
  return (
    <Fragment>
      <SessionCheck />
      <ToastContainer />
      <form onSubmit={submitFormData}>
        <Card className="card-body">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 pt-2">
                <BloodGroupSelect
                  style={{
                    minHeight: 10,
                    maxHeight: 27,
                    paddingTop: 0,
                    paddingBottom: 4,
                  }}
                />
              </div>
              <div className="col-md-3 pt-2">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="No of bag Requested"
                  value={noofbrdrequired}
                  name="noofbrdrequired"
                  changeTextValue={(e) => updateFormData(e)}
                  disabled={enable}
                />
              </div>
              <div className="col-md-3 pt-2">
                <label htmlFor="test" className="form-label">
                  Requested Date/Time
                </label>
              </div>
              <div className="col-md-2 pt-2 pl-0">
                <TextInput
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Requested date/Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={requesteddatetime}
                  name="requesteddatetime"
                  disabled={enable}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 pt-2">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="No. of Bag Received"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofbagreceived}
                  name="noofbagreceived"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3 pt-2">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="No. Of Product Used"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofprdct_used}
                  name="noofprdct_used"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3 pt-2">
                <label htmlFor="test" className="form-label">
                  Received Date/Time
                </label>
              </div>
              <div className="col-md-2 pt-2 pl-0">
                <TextInput
                  id="test"
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Requested date/Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={recieved_datetime}
                  name="recieved_datetime"
                  disabled={enable}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 pt-2 pr-0">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="No. of Product Wasted"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofprdct_wasted}
                  name="noofprdct_wasted"
                  disabled={enable}
                />
              </div>
              <div className="col-md-3 pt-2">
                <OptionSelection
                  style={{
                    minHeight: 10,
                    maxHeight: 27,
                    paddingTop: 0,
                    paddingBottom: 4
                  }}
                />
              </div>
              <div className="col-md-5 pt-2">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="Remarkz"
                  changeTextValue={(e) => updateFormData(e)}
                  value={remarks}
                  name="remarks"
                  disabled={enable}
                />
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
              edit={editbloodcompnt} />
          </div>
        </div>
      </form>
    </Fragment>
  )
}
export default Bloodcomponents
