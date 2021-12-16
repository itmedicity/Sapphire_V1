import React, { Fragment, useState, useContext } from 'react'
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

const Bloodcomponents = () => {
  const { id } = useParams()
  const history = useHistory()

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

  //saving form data
  const submitFormData = async (e) => {
    e.preventDefault()
    const result = await axioslogin.post('/bloodcomponents', postData)
    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setBloodcomponentData(defaultstate)
      updateBloodGroup(0)
      updateOption(0)
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
                />
              </div>
              <div className="col-md-3 pt-2">
                <label htmlFor="test" className="form-label">
                  Requested Date/Time
                </label>
              </div>
              <div className="col-md-2 pt-2 ">
                <TextInput
                  type="datetime-local"
                  classname="form-control form-control-sm"
                  Placeholder="Requested date/Time"
                  changeTextValue={(e) => updateFormData(e)}
                  value={requesteddatetime}
                  name="requesteddatetime"
                />
              </div>
              <div className="col-md-1">
                <Chip
                  icon={
                    <IconButton type="submit" className="p-1">
                      <MdOutlineAddTask className="text-info p-0" size={22} />
                    </IconButton>
                  }
                  label="Save"
                  style={{ cursor: 'pointer' }}
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
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 pt-2">
                <TextInput
                  type="text"
                  classname="form-control form-control-sm"
                  Placeholder="No. of Product Wasted"
                  changeTextValue={(e) => updateFormData(e)}
                  value={noofprdct_wasted}
                  name="noofprdct_wasted"
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
                />
              </div>
            </div>
          </div>
        </Card>
      </form>
    </Fragment>
  )
}
export default Bloodcomponents
